from flask import Flask, request, send_file, Response, make_response
import pandas as pd
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import numpy as np
import os
import math
from io import StringIO, BytesIO
import uuid


def get_mac_addresses(mac_df, analysis_object):
    # saving the list of all mac addresses found
    analysis_object["mac_addresses"] = list(
        set(mac_df["Address A"].unique()) | set(mac_df["Address B"].unique())
    ).sort()
    return


def get_duration_hist(mac_df, analysis_object, id):
    # saving a plot of the duration histogram
    # It is possible that IoT devices have higher duration of packet transmission
    fig = Figure()
    plt.hist(mac_df["Duration"])
    plt.xlabel("Duration (s)")
    plt.ylabel("Frequency")
    plt.title("Histogram of packet transfer duration")
    plt.savefig(f"./public/images/{id}/duration_histogram.png")

    plt.clf()
    plt.close(fig)

    analysis_object[
        "duration_histogram"
    ] = f"/public/images/{id}/duration_histogram.png"
    return


def get_packets_sent_and_received(mac_df, analysis_object, id):
    # saving the packets sent and received graph
    num_packets = {}

    for i in range(len(mac_df)):
        sour = mac_df.iloc[i]["Address A"]
        des = mac_df.iloc[i]["Address B"]
        if sour in num_packets:
            # add to the number of packets sent by sour/A
            num_packets[sour][0] += mac_df.iloc[i]["Packets A â B"]
            # add to the number of packets received by sour/A
            num_packets[sour][1] += mac_df.iloc[i]["Packets B â A"]
        else:
            num_packets[sour] = [
                mac_df.iloc[i]["Packets A â B"],
                mac_df.iloc[i]["Packets B â A"],
            ]

        if des in num_packets:
            # add to the number of packets sent by des/B
            num_packets[des][0] += mac_df.iloc[i]["Packets B â A"]
            # add to the number of packets received by des/B
            num_packets[des][1] += mac_df.iloc[i]["Packets A â B"]
        else:
            num_packets[des] = [
                mac_df.iloc[i]["Packets B â A"],
                mac_df.iloc[i]["Packets A â B"],
            ]

    num_packets = {
        key: val for key, val in sorted(num_packets.items(), key=lambda ele: ele[0])
    }

    num_packets_sent = []
    num_packets_received = []

    for addr in num_packets:
        num_packets_sent.append(num_packets[addr][0])
        num_packets_received.append(num_packets[addr][1])

    X_axis = np.arange(len(num_packets))

    fig = Figure(figsize=(10, 10))
    plt.bar(X_axis - 0.2, num_packets_sent, 0.4, label="Sent")
    plt.bar(X_axis + 0.2, num_packets_received, 0.4, label="Received")

    plt.xticks(X_axis, X_axis)
    plt.xlabel("MAC addresses")
    plt.ylabel("Number of Packets")
    plt.title("Number of packets sent and received")
    plt.legend()

    plt.savefig(f"./public/images/{id}/packets_sent_and_received.png")

    plt.clf()
    plt.close(fig)

    analysis_object[
        "packets_sent_and_received"
    ] = f"public/images/{id}/packets_sent_and_received.png"
    return


def get_bandwidth_plots(network_df, analysis_object, id):
    # Find the time range for the packet capture
    end_time = math.ceil(network_df["Time"].iloc[-1]) + 1

    unique_addrs = list(
        set(network_df["Source"].unique()) | set(network_df["Destination"].unique())
    )

    # Keep track of the number of bytes sent every second by every IP address / MAC address
    bandwidth_info = {}
    for addr in unique_addrs:
        bandwidth_info[addr] = [0] * end_time

    # if t-1 < time <= t, then add the number of bytes in that row to index t
    for i in range(len(network_df)):
        src = network_df.iloc[i]["Source"]
        dst = network_df.iloc[i]["Destination"]
        time = network_df.iloc[i]["Time"]
        num_bytes = network_df.iloc[i]["Length"]
        idx = math.ceil(time)
        bandwidth_info[src][idx] += num_bytes
        bandwidth_info[dst][idx] += num_bytes

    bandwidth_graphs = {}
    for addr in unique_addrs:
        fig = Figure()
        plt.title(f"Bandwidth graph for IP address {addr}")
        plt.plot(bandwidth_info[addr])
        plt.xlabel("Time (s)")
        plt.ylabel("Bytes/s")
        plt.savefig(f"./public/images/{id}/{addr}.png")

        plt.clf()
        plt.close(fig)

        bandwidth_graphs[addr] = f"public/images/{id}/{addr}.png"

    analysis_object["bandwidth_graph"] = bandwidth_graphs
    return


# networkActivityCSV is file, macAddressCSV is string
def parse_csv(networkActivityCSV, macAddressCSV):
    # make the directory that will contain all the images for this instance
    random_id = uuid.uuid4().__str__()

    os.mkdir(f"./public/images/{random_id}")

    analysis_object = {"id": random_id}

    network_df = pd.read_csv(networkActivityCSV, encoding="latin-1")
    mac_df = pd.read_csv(macAddressCSV, encoding="latin-1")

    get_mac_addresses(mac_df, analysis_object)
    get_duration_hist(mac_df, analysis_object, random_id)
    get_packets_sent_and_received(mac_df, analysis_object, random_id)
    get_bandwidth_plots(network_df, analysis_object, random_id)
    return analysis_object
