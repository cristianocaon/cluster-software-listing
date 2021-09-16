export default function getFirstChild(data, partition) {
    let version = Object.keys(data[partition].versions);
    return data[partition].versions[version].child;
}
