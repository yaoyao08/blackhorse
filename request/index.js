const getRequest=(params)=>{
    const base="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            data:{
                ...params.params
            },
            url:base+params.url,
            method: 'GET',
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })   
    })
}

export const postRequest=(params)=>{

    console.log(params);
    const base="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            
            data:{
                ...params.params
            },
            url:base+params.url,
            method: 'POST',
            success:(res)=>{
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        })   
    })
}

export default getRequest;
