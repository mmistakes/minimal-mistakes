"""Fetch download statistics for a GitHub repository and output to a directory."""

import os
from glob import glob

import pandas as pd


def main(folder):
    """Combine cumulative statistics for all repositories into a single file."""
    repo_wise_cumulative_files = sorted(
        glob(os.path.join(folder, "ReproBrainChart_*_cum_clones.csv"))
    )
    dfs = []
    for file_ in repo_wise_cumulative_files:
        repo_name = os.path.basename(file_).split("_cum_clones")[0]
        repo_name = repo_name.replace("_", "/", 1)
        df = pd.read_csv(file_, index_col="date")
        df = df.rename({"clone_count": repo_name}, axis=1)
        # Drop duplicate index rows, retaining the highest clone count.
        df = df.loc[~df.index.duplicated(keep="first")]
        dfs.append(df)

    # Concatenate all repo-wise cumulative stats into a single DataFrame
    df_cum = pd.concat(dfs, axis=1)
    df_cum.fillna(0, inplace=True)
    df_cum = df_cum.sort_index()

    # Calculate the overall cumulative clone count
    df_cum["Overall"] = df_cum.sum(axis=1)

    # update overall cumulative stats across all repos
    overall_cumulative_clones_file = os.path.join(folder, "all_repos_cumulative.csv")
    df_cum.to_csv(overall_cumulative_clones_file, index_label="date")


if __name__ == "__main__":
    script_dir = os.path.dirname(__file__)
    stats_dir = os.path.abspath(os.path.join(script_dir, "../../_data/clone-tracking/cumulative"))
    main(stats_dir)
