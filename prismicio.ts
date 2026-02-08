import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY || "prof-daiana";

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
const routes: prismic.ClientConfig["routes"] = [
    {
        type: "book",
        path: "/livros/:uid",
    },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
    const client = prismic.createClient(repositoryName, {
        routes,
        fetchOptions:
            process.env.NODE_ENV === "production"
                ? { next: { revalidate: 3600 } }
                : { next: { revalidate: 0 } },
        ...config,
    });

    prismicNext.enableAutoPreviews({
        client,
    });

    return client;
};
