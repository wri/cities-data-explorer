import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
    }
});

const excludeRegex = new RegExp(process.env.EXCLUDE_PATTERN || /(?!)/);

const ListObjects = async (prefix) => {
    const data = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: process.env.NEXT_PUBLIC_BUCKET,
            Prefix: prefix,
            Delimiter: "/",
        })
    );
    return {
        folders:
            data.CommonPrefixes?.filter(
                ({ Prefix }) => !excludeRegex.test(Prefix)
            ).map(({ Prefix }) => ({
                name: Prefix.slice(prefix.length),
                path: Prefix,
                url: `/?prefix=${Prefix}`,
            })) || [],
        objects:
            data.Contents?.filter(({ Key }) => !excludeRegex.test(Key)).map(
                ({ Key, LastModified, Size }) => ({
                    name: Key.slice(prefix.length),
                    lastModified: LastModified,
                    size: Size,
                    path: Key,
                    url: `http://${process.env.NEXT_PUBLIC_BUCKET}/${Key}`,
                })
            ).filter(({ name }) => name.endsWith(".tif")) || [],
    };
};

export default ListObjects