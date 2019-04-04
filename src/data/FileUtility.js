
export default class FileUtility {
        
        constructor(){
            
        }
        
        makeJsonFile(data, ext = 'json', type = 'application/json'){
            return this.makeFile(JSON.stringify(data), ext);
        }
        
        makeFile(str, ext = 'txt', type = 'text/plain'){
            return URL.createObjectURL(new Blob([str], {type: type}));
        }
        
        readFile(file, callback){
            let Reader = new FileReader();
            Reader.readAsText(file);
            Reader.onload = callback;
        }
}