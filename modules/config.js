import strapi from "./strapi.js";

const fetchConfig = async () => {
    const config = await strapi.get("config", { populate: "*" })
    return config
}

let config = await fetchConfig()

export const revalidateConfig = async () => {
    try {
        config = await fetchConfig()
    } catch (e) {
        console.error(e)
    }
}

export const getConfig = () => config

setInterval(async () => {
    revalidateConfig()
}, 60 * 1000)

export default config