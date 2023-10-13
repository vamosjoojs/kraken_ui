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
    if (kraken === 'TWITTER') {
        return 'Twitter'
    }
    if (kraken === 'TIKTOK') {
        return 'TikTok'
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

export function removeHours(numOfHours, date) {
    let dateAdujusted = new Date(date)
    dateAdujusted.setTime(new Date(date).getTime() - numOfHours * 60 * 60 * 1000);
    return GetDateTime(dateAdujusted);
  }

export function GetDateTime(date) {
    var now     = new Date(); 
    if (date !== undefined) {
        now = new Date(date)
    }
    
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+'T'+hour+':'+minute   
     return dateTime;
}
