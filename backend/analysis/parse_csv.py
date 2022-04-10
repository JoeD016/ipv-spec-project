import pandas as pd


def parse_csv(uploaded_file):
    uploaded_file.save(uploaded_file.filename)
    df = pd.read_csv("./uploads/" + uploaded_file.filename)
    print(df.head())
