import { LightningElement,api,track } from 'lwc';

export default class Recaptcha extends LightningElement {
    @track navigateTo="/apex/portalSmartyAddress";
    @track _url="";
    @track _height="";
    @track data;
    
    @api
    get height() {
        return this._height;
    }

    set height(value) {
       this._height = value;
    }

    @api
    get url() {
        return this._url;
    }

    set url(value) {
       this._url = value;
    }

    @api
    getAddress() {
        return window.address;
    }
    
    @api
    getValue()
    {
       return window.data;
    }
    
    listenMessage(msg) 
    {
        window.data=msg.data;
        this.data=msg.data;
        if(this.data!=='Unlock')
        {
            window.address=msg.data
        }
    }
    connectedCallback()
    {
        if (window.addEventListener) {
            window.addEventListener("message", this.listenMessage, false);
        } else {
            window.attachEvent("onmessage", this.listenMessage);
        }
    }
}
