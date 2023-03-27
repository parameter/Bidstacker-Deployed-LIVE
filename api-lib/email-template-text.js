
const print_paragraphs = (paragraphs) => {
    return paragraphs.map((item) => {
        return `${item}\r\n\r\n`
    })
}

export default ({ title, content_paragraphs, signoff, assets_domain }) => {
    return (`${title}\r\n\r\n${print_paragraphs(content_paragraphs)}\r\n\r\n${signoff}\r\n\r\n---------------------------\r\n\r\nBesök oss på våra sociala medier\r\n\r\nlinkedin.com/company/bidstacker-se \r\nfacebook.com/bidstacker \r\ninstagram.com/bidstacker \r\ntwitter.com/bidstacker \r\n`)
}
