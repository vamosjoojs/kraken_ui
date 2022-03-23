export function dateAdjust(t) {
    if (t != null){
        const dateParsed = new Date(t)
        const date = ('0' + dateParsed.getDate()).slice(-2);
        const month = ('0' + (dateParsed.getMonth() + 1)).slice(-2);
        const year = dateParsed.getFullYear();
        return `${date}/${month}/${year}`;
    }
  }