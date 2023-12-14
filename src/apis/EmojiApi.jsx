export const EmojiApi = async(query)=>{
    try {
        const APIURL = `https://emoji-api.com/${query}access_key=35cd08d6bb5fef868598f495f5efc374eb53fbba  `;
        const res = await fetch(APIURL);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}