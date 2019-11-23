function getFirsrtImage(data){
    //let count = (req.body.editor.match(/<img/g) || []).length;
    let regex = /<img.*?src="(.*?)"/;
    //let arrImgTag = [], arrImage = [];
    //let str = req.body.editor;
    //let src, imgTag;
    
    // while(count>0){
    //     imgTag = regex.exec(str)[0];
    //     arrImgTag.push(imgTag);
    //     str = str.replace(imgTag,''); 
    //     count--;
    // }
    
    // for(let i=0; i<arrImgTag.length; i++){
    //     src = regex.exec(arrImgTag[i])[1];
    //     arrImage.push(src);
    // }
    let img = regex.exec(data)[1];
    return img;
    
}