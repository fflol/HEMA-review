const timeOption = {
    day: "2-digit",
    month: "short",
    year: "numeric"
};

export const FbTimestampToReadable = timestamp =>
    new Date(timestamp * 1000).toLocaleDateString("en-US", timeOption);
