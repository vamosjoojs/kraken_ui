export function dateAdjust(t) {
    if (t != null){
        const dateParsed = new Date(t)
        const date = ('0' + dateParsed.getDate()).slice(-2);
        const month = ('0' + (dateParsed.getMonth() + 1)).slice(-2);
        const year = dateParsed.getFullYear();
        return `${date}/${month}/${year}`;
    }
  }

export function krakenHand(kraken) {
    if (kraken === 'INSTAGRAM') {
        return 'Instagram'
    }
    
}


export function PostStatus(post) {
    if (post === 'CREATED') {
        return 'Criado'
    }
    else if (post === 'POSTING') {
        return 'Postando'
    }
    else if (post === 'INITIATED') {
        return 'Iniciado'
    }
    else if (post === 'DOWNLOADING_CLIP') {
        return 'Baixando Clip'
    }
    else if (post === 'COMPLETED') {
        return 'Completo'
    }
    else if (post === 'ERROR') {
        return 'Erro'
    }
    
}