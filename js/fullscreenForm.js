(function(window){'use strict';var support={animations:Modernizr.cssanimations},animEndEventNames={'WebkitAnimation':'webkitAnimationEnd','OAnimation':'oAnimationEnd','msAnimation':'MSAnimationEnd','animation':'animationend'},animEndEventName=animEndEventNames[Modernizr.prefixed('animation')];function extend(a,b){for(var key in b){if(b.hasOwnProperty(key)){a[key]=b[key]}}
return a}
function createElement(tag,opt){var el=document.createElement(tag)
if(opt){if(opt.cName){el.className=opt.cName}
if(opt.inner){el.innerHTML=opt.inner}
if(opt.appendTo){opt.appendTo.appendChild(el)}}
return el}
function FForm(el,options){this.el=el;this.options=extend({},this.options);extend(this.options,options);this._init()}
FForm.prototype.options={ctrlProgress:!0,ctrlNavDots:!0,ctrlNavPosition:!0,onReview:function(){return!1}};FForm.prototype._init=function(){this.formEl=this.el.querySelector('form');this.fieldsList=this.formEl.querySelector('ol.fs-fields');this.current=0;this.fields=[].slice.call(this.fieldsList.children);this.fieldsCount=this.fields.length;classie.add(this.fields[this.current],'fs-current');this._addControls();this._addErrorMsg();this._initEvents()};FForm.prototype._addControls=function(){this.ctrls=createElement('div',{cName:'fs-controls',appendTo:this.el});this.ctrlContinue=createElement('button',{cName:'fs-continue',inner:'Continue',appendTo:this.ctrls});this._showCtrl(this.ctrlContinue);if(this.options.ctrlNavDots){this.ctrlNav=createElement('nav',{cName:'fs-nav-dots',appendTo:this.ctrls});var dots='';for(var i=0;i<this.fieldsCount;++i){dots+=i===this.current?'<button class="fs-dot-current"></button>':'<button disabled></button>'}
this.ctrlNav.innerHTML=dots;this._showCtrl(this.ctrlNav);this.ctrlNavDots=[].slice.call(this.ctrlNav.children)}
if(this.options.ctrlNavPosition){this.ctrlFldStatus=createElement('span',{cName:'fs-numbers',appendTo:this.ctrls});this.ctrlFldStatusCurr=createElement('span',{cName:'fs-number-current',inner:Number(this.current+1)});this.ctrlFldStatus.appendChild(this.ctrlFldStatusCurr);this.ctrlFldStatusTotal=createElement('span',{cName:'fs-number-total',inner:this.fieldsCount});this.ctrlFldStatus.appendChild(this.ctrlFldStatusTotal);this._showCtrl(this.ctrlFldStatus)}
if(this.options.ctrlProgress){this.ctrlProgress=createElement('div',{cName:'fs-progress',appendTo:this.ctrls});this._showCtrl(this.ctrlProgress)}}
FForm.prototype._addErrorMsg=function(){this.msgError=createElement('span',{cName:'fs-message-error',appendTo:this.el})}
FForm.prototype._initEvents=function(){var self=this;this.ctrlContinue.addEventListener('click',function(){self._nextField()});if(this.options.ctrlNavDots){this.ctrlNavDots.forEach(function(dot,pos){dot.addEventListener('click',function(){self._showField(pos)})})}
this.fields.forEach(function(fld){if(fld.hasAttribute('data-input-trigger')){var input=fld.querySelector('input[type="radio"]')||fld.querySelector('select');if(!input)return;switch(input.tagName.toLowerCase()){case 'select':input.addEventListener('change',function(){self._nextField()});break;case 'input':[].slice.call(fld.querySelectorAll('input[type="radio"]')).forEach(function(inp){inp.addEventListener('change',function(ev){self._nextField()})});break}}});document.addEventListener('keydown',function(ev){if(!self.isLastStep&&ev.target.tagName.toLowerCase()!=='textarea'){var keyCode=ev.keyCode||ev.which;if(keyCode===13){ev.preventDefault();self._nextField()}}})};FForm.prototype._nextField=function(backto){if(this.isLastStep||!this._validade()||this.isAnimating){return!1}
this.isAnimating=!0;this.isLastStep=this.current===this.fieldsCount-1&&backto===undefined?!0:!1;this._clearError();var currentFld=this.fields[this.current];this.navdir=backto!==undefined?backto<this.current?'prev':'next':'next';this.current=backto!==undefined?backto:this.current+1;if(backto===undefined){this._progress();this.farthest=this.current}
classie.add(this.fieldsList,'fs-display-'+this.navdir);classie.remove(currentFld,'fs-current');classie.add(currentFld,'fs-hide');if(!this.isLastStep){this._updateNav();this._updateFieldNumber();var nextField=this.fields[this.current];classie.add(nextField,'fs-current');classie.add(nextField,'fs-show')}
var self=this,onEndAnimationFn=function(ev){if(support.animations){this.removeEventListener(animEndEventName,onEndAnimationFn)}
classie.remove(self.fieldsList,'fs-display-'+self.navdir);classie.remove(currentFld,'fs-hide');if(self.isLastStep){self._hideCtrl(self.ctrlNav);self._hideCtrl(self.ctrlProgress);self._hideCtrl(self.ctrlContinue);self._hideCtrl(self.ctrlFldStatus);classie.remove(self.formEl,'fs-form-full');classie.add(self.formEl,'fs-form-overview');classie.add(self.formEl,'fs-show');self.options.onReview()}
else{classie.remove(nextField,'fs-show');if(self.options.ctrlNavPosition){self.ctrlFldStatusCurr.innerHTML=self.ctrlFldStatusNew.innerHTML;self.ctrlFldStatus.removeChild(self.ctrlFldStatusNew);classie.remove(self.ctrlFldStatus,'fs-show-'+self.navdir)}}
self.isAnimating=!1};if(support.animations){if(this.navdir==='next'){if(this.isLastStep){currentFld.querySelector('.fs-anim-upper').addEventListener(animEndEventName,onEndAnimationFn)}
else{nextField.querySelector('.fs-anim-lower').addEventListener(animEndEventName,onEndAnimationFn)}}
else{nextField.querySelector('.fs-anim-upper').addEventListener(animEndEventName,onEndAnimationFn)}}
else{onEndAnimationFn()}}
FForm.prototype._showField=function(pos){if(pos===this.current||pos<0||pos>this.fieldsCount-1){return!1}
this._nextField(pos)}
FForm.prototype._updateFieldNumber=function(){if(this.options.ctrlNavPosition){this.ctrlFldStatusNew=document.createElement('span');this.ctrlFldStatusNew.className='fs-number-new';this.ctrlFldStatusNew.innerHTML=Number(this.current+1);this.ctrlFldStatus.appendChild(this.ctrlFldStatusNew);var self=this;setTimeout(function(){classie.add(self.ctrlFldStatus,self.navdir==='next'?'fs-show-next':'fs-show-prev')},25)}}
FForm.prototype._progress=function(){if(this.options.ctrlProgress){this.ctrlProgress.style.width=this.current*(100/this.fieldsCount)+'%'}}
FForm.prototype._updateNav=function(){if(this.options.ctrlNavDots){classie.remove(this.ctrlNav.querySelector('button.fs-dot-current'),'fs-dot-current');classie.add(this.ctrlNavDots[this.current],'fs-dot-current');this.ctrlNavDots[this.current].disabled=!1}}
FForm.prototype._showCtrl=function(ctrl){classie.add(ctrl,'fs-show')}
FForm.prototype._hideCtrl=function(ctrl){classie.remove(ctrl,'fs-show')}
FForm.prototype._validade=function(){var fld=this.fields[this.current],input=fld.querySelector('input[required]')||fld.querySelector('textarea[required]')||fld.querySelector('select[required]'),error;if(!input)return!0;switch(input.tagName.toLowerCase()){case 'input':if(input.type==='radio'||input.type==='checkbox'){var checked=0;[].slice.call(fld.querySelectorAll('input[type="'+input.type+'"]')).forEach(function(inp){if(inp.checked){++checked}});if(!checked){error='NOVAL'}}
else if(input.value===''){error='NOVAL'}
break;case 'select':if(input.value===''||input.value==='-1'){error='NOVAL'}
break;case 'textarea':if(input.value===''){error='NOVAL'}
break}
if(error!=undefined){this._showError(error);return!1}
return!0}
FForm.prototype._showError=function(err){var message='';switch(err){case 'NOVAL':message='Please fill the field before continuing';break;case 'INVALIDEMAIL':message='Please fill a valid email address';break};this.msgError.innerHTML=message;this._showCtrl(this.msgError)}
FForm.prototype._clearError=function(){this._hideCtrl(this.msgError)}
window.FForm=FForm})(window)