import axios from "axios";

export default class FakeYoutubeClient{
    async search(params) {
        return params.channelId 
        ? axios.get('mock-data/other-list.json')
        : axios.get('mock-data/search.json');
    }

    async videos() {
        return axios.get('mock-data/popular.json');
    }

    async channels() {
        return axios.get('mock-data/channels.json');
    }
}

