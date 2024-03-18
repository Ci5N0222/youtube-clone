export default class Youtube{
    constructor(apiClient){
        this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword): this.#mostPopular();
    }

    async channelImageUrl(id) {
        return this.apiClient
        .channels({
            params: {
                part: 'snippet', 
                id
            }
        })
        .then(res => res.data.items[0].snippet.thumbnails.default.url)
    }

    async otherList(id) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                channelId: id,
                maxResults: 25,
                order: 'date',
            }
        })
        .then((res) => res.data.items.map((item) => ({...item, id: item.id})))
    }

    async #searchByKeyword(keyword) {
        return this.apiClient
            .search({
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    q: keyword,
                }
            })
            .then((res) => res.data.items)
            .then((items) => items.map((item) => ({...item, id: item.id.videoId})))
    }

    async #mostPopular() {
        return this.apiClient
            .videos({
                params: {
                    part: 'snippet',
                    chart: 'mostPopular',
                    maxResults: 25,
                }
            })
            .then((res) => res.data.items)
    }
}

