const stats = (arr) => {
    let stats = {
        'length' : 0,
        'broken' : 0,
        'ok' : 0,
    }

    arr.forEach(linkOb => {
        stats['length'] += 1

        if (linkOb.status == 200){
            stats['ok'] += 1
        }else{
            stats['broken'] +=1
        }
        
    })

    return stats
}

module.exports = stats;