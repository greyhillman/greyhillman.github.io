(function(e){function t(t){for(var c,l,a=t[0],i=t[1],u=t[2],d=0,b=[];d<a.length;d++)l=a[d],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&b.push(o[l][0]),o[l]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);m&&m(t);while(b.length)b.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],c=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(c=!1)}c&&(r.splice(t--,1),e=l(l.s=n[0]))}return e}var c={},o={app:0},r=[];function l(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=c,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)l.d(n,c,function(t){return e[t]}.bind(null,c));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var m=i;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"81af":function(e,t,n){},"835c":function(e,t,n){"use strict";n("81af")},cd49:function(e,t,n){"use strict";n.r(t);var c=n("7a23"),o=n("be92"),r={"t2.micro":{cpu:1,memory:1},"t2.small":{cpu:1,memory:2},"t2.medium":{cpu:2,memory:4},"t2.large":{cpu:2,memory:8},"t2.xlarge":{cpu:4,memory:16},"t2.2xlarge":{cpu:8,memory:32}};function l(e){return Object(o["b"])(e,(function(){var e=Object(c["ref"])("t2.micro");return{type:e,size:Object(c["computed"])((function(){return r[e.value]}))}}))()}var a=Object(c["createElementVNode"])("label",{for:"instance-type"},"Instance Type",-1),i=Object(c["createStaticVNode"])('<optgroup label="t2"><option value="t2.micro">t2.micro</option><option value="t2.small">t2.small</option><option value="t2.medium">t2.medium</option><option value="t2.large">t2.large</option><option value="t2.xlarge">t2.xlarge</option><option value="t2.2xlarge">t2.2xlarge</option></optgroup><optgroup label="t3"><option>t3.small</option><option>t3.large</option><option>t3.xlarge</option></optgroup>',2),u=[i],m=Object(c["defineComponent"])({__name:"InstanceType",props:{id:null},setup:function(e){var t=e,n=l(t.id);return function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[a,Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{name:"instance-type","onUpdate:modelValue":t[0]||(t[0]=function(e){return Object(c["unref"])(n).type=e})},u,512),[[c["vModelSelect"],Object(c["unref"])(n).type]])],64)}}});const d=m;var b=d;function p(e){return Object(o["b"])(e,(function(){var e=Object(c["ref"])(1),t=Object(c["ref"])(1),n=Object(c["ref"])(10);return{min:e,max:n,desired:Object(c["computed"])({get:function(){return t.value=Math.max(t.value,e.value),t.value=Math.min(t.value,n.value),t.value},set:function(e){t.value=e}})}}))()}var s={class:"capacity"},O=Object(c["createElementVNode"])("legend",null,"Capacity",-1),j=Object(c["createElementVNode"])("label",{for:"min"}," Minimum ",-1),f=Object(c["createElementVNode"])("label",{for:"desired"}," Desired ",-1),v=Object(c["createElementVNode"])("label",{for:"max"}," Maximum ",-1),y=Object(c["defineComponent"])({__name:"Capacity",props:{id:null},setup:function(e){var t=e,n=p(t.id);return function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("fieldset",s,[O,j,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"min",type:"number",min:"1",max:"20","onUpdate:modelValue":t[0]||(t[0]=function(e){return Object(c["unref"])(n).min=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).min]]),Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"min",type:"range",min:"1",max:"20","onUpdate:modelValue":t[1]||(t[1]=function(e){return Object(c["unref"])(n).min=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).min]]),f,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"desired",type:"number",min:"1",max:"20","onUpdate:modelValue":t[2]||(t[2]=function(e){return Object(c["unref"])(n).desired=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).desired]]),Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"desired",type:"range",min:"1",max:"20","onUpdate:modelValue":t[3]||(t[3]=function(e){return Object(c["unref"])(n).desired=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).desired]]),v,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"max",type:"number",min:"1",max:"20","onUpdate:modelValue":t[4]||(t[4]=function(e){return Object(c["unref"])(n).max=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).max]]),Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"max",type:"range",min:"1",max:"20","onUpdate:modelValue":t[5]||(t[5]=function(e){return Object(c["unref"])(n).max=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).max]])])}}});const V=y;var E=V;function N(e){return Object(o["b"])(e,(function(){var e=Object(c["ref"])("add"),t=Object(c["ref"])(1),n=Object(c["ref"])(120);return{action:e,units:t,cooldown:n}}))()}function g(e,t){return Object(o["b"])(e,(function(){var n=Object(c["ref"])(t.metric),o=Object(c["ref"])(t.condition),r=Object(c["ref"])(t.threshold),l=N("".concat(e,"-policy"));return{metric:n,condition:o,threshold:r,active:function(e){switch(o.value){case"lt":return e<r.value;case"lteq":return e<=r.value;case"gt":return e>r.value;case"gteq":return e>=r.value}},policy:l}}))()}var h=Object(c["createElementVNode"])("legend",null,"Scaling Policy",-1),k=Object(c["createElementVNode"])("option",{value:"add"},"Add",-1),w=Object(c["createElementVNode"])("option",{value:"remove"},"Remove",-1),x=[k,w],B=Object(c["createElementVNode"])("label",{for:"units"}," Units ",-1),S=Object(c["createElementVNode"])("label",{for:"cooldown"}," Scaling cooldown (seconds) ",-1),_=Object(c["defineComponent"])({__name:"ScalingPolicy",props:{id:null},setup:function(e){var t=e,n=N(t.id);return function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("fieldset",null,[h,Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{"onUpdate:modelValue":t[0]||(t[0]=function(e){return Object(c["unref"])(n).action=e})},x,512),[[c["vModelSelect"],Object(c["unref"])(n).action]]),Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"number",min:"1","onUpdate:modelValue":t[1]||(t[1]=function(e){return Object(c["unref"])(n).units=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).units]]),B,S,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"number",min:"0","onUpdate:modelValue":t[2]||(t[2]=function(e){return Object(c["unref"])(n).cooldown=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).cooldown]])])}}});const C=_;var M=C,D={class:"alarm"},U=Object(c["createElementVNode"])("legend",null,"Alarm",-1),T=Object(c["createElementVNode"])("option",{value:"lt"},"<",-1),z=Object(c["createElementVNode"])("option",{value:"lteq"},"<=",-1),P=Object(c["createElementVNode"])("option",{value:"gt"},">",-1),A=Object(c["createElementVNode"])("option",{value:"gteq"},">=",-1),$=[T,z,P,A],F=Object(c["defineComponent"])({__name:"Alarm",props:{id:null,metric:null},setup:function(e){var t=e,n=g(t.id,{metric:t.metric,condition:"lt",threshold:50});return function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("fieldset",D,[U,Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{"onUpdate:modelValue":t[0]||(t[0]=function(e){return Object(c["unref"])(n).metric=e})},[Object(c["renderSlot"])(e.$slots,"metric_options")],512),[[c["vModelSelect"],Object(c["unref"])(n).metric]]),Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{class:"operator","onUpdate:modelValue":t[1]||(t[1]=function(e){return Object(c["unref"])(n).condition=e})},$,512),[[c["vModelSelect"],Object(c["unref"])(n).condition]]),Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"number",min:"0",max:"100","onUpdate:modelValue":t[2]||(t[2]=function(e){return Object(c["unref"])(n).threshold=e})},null,512),[[c["vModelText"],Object(c["unref"])(n).threshold]]),Object(c["createVNode"])(M,{id:Object(c["unref"])(n).policy.$id},null,8,["id"])])}}});const I=F;var R=I;function q(e,t){return Object(o["b"])(e,(function(){var n=Object(c["ref"])([]);return{items:Object(c["computed"])((function(){return n.value.map((function(e){return t(e)}))})),length:Object(c["computed"])((function(){return n.value.length})),add:function(){n.value.push("".concat(e,"-").concat(Math.random().toString()))},remove:function(e){n.value.splice(e,1)}}}))()}function G(e){return Object(o["b"])(e,(function(){var t=p("".concat(e,"-capacity")),n=Object(c["ref"])(1024),o=Object(c["ref"])(1024),r=q("".concat(e,"-alarms"),(function(e){return g(e,{metric:"cpu-utilization",condition:"lt",threshold:50})}));return{capacity:t,container:{cpu:n,memory:o},alarms:r,cooldown:Object(c["ref"])(0)}}))()}function L(e){return Object(o["b"])(e,(function(){var e=G("ecs"),t=Object(c["ref"])(e.container.cpu),n=Object(c["ref"])(e.container.memory);return{cpu:t,memory:n}}))()}function J(e,t){return Object(o["b"])(e,(function(){var n=Object(c["ref"])(t.type),o=Object(c["ref"])(t.size),r=q("".concat(e,"-containers"),(function(e){return L(e)})),l=Object(c["computed"])((function(){for(var e=0,t=0,n=r.items;t<n.length;t++){var c=n[t];e+=c.cpu}return e})),a=Object(c["computed"])((function(){for(var e=0,t=0,n=r.items;t<n.length;t++){var c=n[t];e+=c.memory}return e}));return{type:n,size:o,containers:r,reserved:{cpu:l,memory:a},available:{cpu:Object(c["computed"])((function(){return 1024*o.value.cpu-l.value})),memory:Object(c["computed"])((function(){return 1024*o.value.memory-a.value}))}}}))()}function W(e){return Object(o["b"])(e,(function(){var t=p("".concat(e,"-capacity")),n=l("".concat(e,"-template-instance")),o=q("".concat(e,"-alarms"),(function(e){return g(e,{condition:"lt",metric:"cpu-reservation",threshold:50})})),r=Object(c["ref"])(0),a=q("".concat(e,"-instances"),(function(e){return J(e,{type:n.type,size:n.size})}));return{capacity:t,template:{instance:n},alarms:o,cooldown:r,instances:a}}))()}var H={id:"asg"},K=Object(c["createElementVNode"])("legend",null,"Auto-Scaling Group",-1),Q={class:"section"},X=Object(c["createElementVNode"])("dt",null,"vCPU",-1),Y=Object(c["createElementVNode"])("dt",null,"Memory (GB)",-1),Z={class:"alarms"},ee=Object(c["createElementVNode"])("legend",null,"Alarms",-1),te=Object(c["createElementVNode"])("option",{value:"cpu-reservation"},"CPU Reservation",-1),ne=Object(c["createElementVNode"])("option",{value:"memory-reservation"},"Memory Reservation",-1),ce=["onClick"],oe=Object(c["defineComponent"])({__name:"AutoScalingGroup",setup:function(e){var t=W("asg");return function(e,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("fieldset",H,[K,Object(c["createVNode"])(b,{id:Object(c["unref"])(t).template.instance.$id},null,8,["id"]),Object(c["createElementVNode"])("output",Q,[Object(c["createElementVNode"])("p",null,"Selected "+Object(c["toDisplayString"])(Object(c["unref"])(t).template.instance.type),1),Object(c["createElementVNode"])("dl",null,[X,Object(c["createElementVNode"])("dd",null,[Object(c["createElementVNode"])("output",null,Object(c["toDisplayString"])(Object(c["unref"])(t).template.instance.size.cpu),1)]),Y,Object(c["createElementVNode"])("dd",null,[Object(c["createElementVNode"])("output",null,Object(c["toDisplayString"])(Object(c["unref"])(t).template.instance.size.memory),1)])])]),Object(c["createVNode"])(E,{id:Object(c["unref"])(t).capacity.$id},null,8,["id"]),Object(c["createElementVNode"])("fieldset",Z,[ee,Object(c["createElementVNode"])("ul",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(t).alarms.items,(function(e,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{key:e.$id},[Object(c["createVNode"])(R,{id:e.$id,metric:"cpu-reservation"},{metric_options:Object(c["withCtx"])((function(){return[te,ne]})),_:2},1032,["id"]),Object(c["createElementVNode"])("button",{onClick:function(e){return Object(c["unref"])(t).alarms.remove(n)}},"Remove",8,ce)])})),128)),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("button",{onClick:n[0]||(n[0]=function(e){return Object(c["unref"])(t).alarms.add()})},"Add")])])])])}}});const re=oe;var le=re,ae={id:"ecs"},ie=Object(c["createElementVNode"])("legend",null,"ECS Service",-1),ue=Object(c["createElementVNode"])("legend",null,"Container",-1),me=Object(c["createElementVNode"])("label",{for:"container_cpu"}," vCPU units ",-1),de=Object(c["createElementVNode"])("label",{for:"container_memory"}," Memory units ",-1),be={class:"alarms"},pe=Object(c["createElementVNode"])("legend",null,"Alarms",-1),se=Object(c["createElementVNode"])("option",{value:"cpu-utilization"},"CPU Utilization",-1),Oe=Object(c["createElementVNode"])("option",{value:"memory-utilization"},"Memory Utilization",-1),je=["onClick"],fe=Object(c["defineComponent"])({__name:"ECSService",setup:function(e){var t=G("ecs");return function(e,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("fieldset",ae,[ie,Object(c["createVNode"])(E,{id:Object(c["unref"])(t).capacity.$id},null,8,["id"]),Object(c["createElementVNode"])("fieldset",null,[ue,me,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"container_cpu",type:"number",min:"128",step:"128","onUpdate:modelValue":n[0]||(n[0]=function(e){return Object(c["unref"])(t).container.cpu=e})},null,512),[[c["vModelText"],Object(c["unref"])(t).container.cpu]]),de,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"container_memory",type:"number",min:"128",step:"128","onUpdate:modelValue":n[1]||(n[1]=function(e){return Object(c["unref"])(t).container.memory=e})},null,512),[[c["vModelText"],Object(c["unref"])(t).container.memory]])]),Object(c["createElementVNode"])("fieldset",be,[pe,Object(c["createElementVNode"])("ul",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(t).alarms.items,(function(e,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{key:e.$id},[Object(c["createVNode"])(R,{metric:"cpu-utilization",id:e.$id},{metric_options:Object(c["withCtx"])((function(){return[se,Oe]})),_:2},1032,["id"]),Object(c["createElementVNode"])("button",{onClick:function(e){return Object(c["unref"])(t).alarms.remove(n)}},"Remove",8,je)])})),128)),Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("button",{onClick:n[2]||(n[2]=function(e){return Object(c["unref"])(t).alarms.add()})},"Add")])])])])}}});const ve=fe;var ye=ve;function Ve(e){return Object(o["b"])(e,(function(){var e=W("asg"),t=G("ecs"),n=Object(c["ref"])(0),o=Object(c["ref"])(0),r=Object(c["ref"])(!1),l=Object(c["ref"])(15),a=Object(c["ref"])(),i=Object(c["watch"])([r,l],(function(c){var r=c[0],l=c[1];clearInterval(a.value),r&&(a.value=setInterval((function(){var c=e.capacity.desired-e.instances.length;if(c>0)for(var r=0;r<c;r++)e.instances.add();else if(c<0)for(r=0;r<-c;r++)e.instances.remove(0);for(var l=[],a=0,i=e.instances.items;a<i.length;a++)for(var u=i[a],m=0,d=u.containers.items;m<d.length;m++){var b=d[m];l.push(b)}var p=t.capacity.desired-l.length;if(p>0)for(r=0;r<p;r++){for(var s=null,O=0,j=e.instances.items;O<j.length;O++){u=j[O];if(u.available.cpu>=t.container.cpu&&u.available.memory>=t.container.memory){s=u;break}}if(!s){console.log("Failed to find instance with available space.");break}s.containers.add()}else if(p<0)for(r=0;r<-p;r++){for(var f=!1,v=0,y=e.instances.items;v<y.length;v++){u=y[v];if(u.containers.length>0){u.containers.remove(0),f=!0;break}}f||console.log("Failed to find container to remove.")}for(var V={cpu:0,memory:0},E={cpu:0,memory:0},N=0,g=e.instances.items;N<g.length;N++){u=g[N];V.cpu+=1024*u.size.cpu,V.memory+=1024*u.size.memory;for(var h=0,k=u.containers.items;h<k.length;h++){b=k[h];E.cpu+=b.cpu,E.memory+=b.memory}}var w={cpu:E.cpu/V.cpu*100,memory:E.memory/V.memory*100};if(e.cooldown>0&&e.cooldown--,e.cooldown<=0)for(var x=0,B=e.alarms.items;x<B.length;x++){var S=B[x];if("cpu-reservation"===S.metric&&S.active(w.cpu)){"add"===S.policy.action?e.capacity.desired+=S.policy.units:"remove"===S.policy.action&&(e.capacity.desired-=S.policy.units),e.cooldown=S.policy.cooldown;break}if("memory-reservation"===S.metric&&S.active(w.memory)){"add"===S.policy.action?e.capacity.desired+=S.policy.units:"remove"===S.policy.action&&(e.capacity.desired-=S.policy.units),e.cooldown=S.policy.cooldown;break}}t.cooldown>0&&t.cooldown--;var _={cpu:n.value/l.length,memory:o.value/l.length};if(t.cooldown<=0)for(var C=0,M=t.alarms.items;C<M.length;C++){S=M[C];if("cpu-utilization"===S.metric&&S.active(_.cpu)){"add"===S.policy.action?t.capacity.desired+=S.policy.units:"remove"===S.policy.action&&(t.capacity.desired-=S.policy.units),t.cooldown=S.policy.cooldown;break}if("memory-utilization"===S.metric&&S.active(_.memory)){"add"===S.policy.action?t.capacity.desired+=S.policy.units:"remove"===S.policy.action&&(t.capacity.desired-=S.policy.units),t.cooldown=S.policy.cooldown;break}}console.log("tick")}),1/l*1e3))}));return{cpu:{value:n,max:Object(c["computed"])((function(){return 100*t.capacity.max}))},memory:{value:o,max:Object(c["computed"])((function(){return 100*t.capacity.max}))},simulationTickId:a,tickWatch:i,fps:l,playing:r,restart:function(){t.cooldown=0,e.cooldown=0,e.capacity.desired=0,t.capacity.desired=0;while(e.instances.length>0)e.instances.remove(0)},pause:function(){r.value=!1},play:function(){r.value=!0}}}))()}var Ee={id:"controls"},Ne=Object(c["createElementVNode"])("legend",null,"Simulation",-1),ge={class:"utilization"},he=Object(c["createElementVNode"])("legend",null,"Total Containers",-1),ke=Object(c["createElementVNode"])("label",{for:"cpu"}," CPU Utilization ",-1),we=["max"],xe=Object(c["createElementVNode"])("label",{for:"memory"}," Memory Utilization ",-1),Be=["max"],Se=Object(c["createElementVNode"])("legend",null,"Time",-1),_e=Object(c["createElementVNode"])("p",null,"1 Tick = 1 second",-1),Ce=Object(c["createElementVNode"])("label",{for:"ticks_per_second"},"Ticks per second",-1),Me={class:"time"},De=Object(c["defineComponent"])({__name:"Controls",setup:function(e){var t=Ve("controls");return function(e,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("fieldset",Ee,[Ne,Object(c["createElementVNode"])("fieldset",ge,[he,ke,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"cpu",type:"range",step:"10",min:"0",max:Object(c["unref"])(t).cpu.max,"onUpdate:modelValue":n[0]||(n[0]=function(e){return Object(c["unref"])(t).cpu.value=e})},null,8,we),[[c["vModelText"],Object(c["unref"])(t).cpu.value]]),Object(c["createElementVNode"])("output",null,Object(c["toDisplayString"])(Object(c["unref"])(t).cpu.value),1),xe,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"memory",type:"range",step:"10",min:"0",max:Object(c["unref"])(t).memory.max,"onUpdate:modelValue":n[1]||(n[1]=function(e){return Object(c["unref"])(t).memory.value=e})},null,8,Be),[[c["vModelText"],Object(c["unref"])(t).memory.value]]),Object(c["createElementVNode"])("output",null,Object(c["toDisplayString"])(Object(c["unref"])(t).memory.value),1)]),Object(c["createElementVNode"])("fieldset",null,[Se,_e,Ce,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{name:"ticks_per_second",type:"range",min:"1",max:"60","onUpdate:modelValue":n[2]||(n[2]=function(e){return Object(c["unref"])(t).fps=e})},null,512),[[c["vModelText"],Object(c["unref"])(t).fps]]),Object(c["createElementVNode"])("output",null,Object(c["toDisplayString"])(Object(c["unref"])(t).fps),1),Object(c["createElementVNode"])("menu",Me,[Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("button",{onClick:n[3]||(n[3]=function(e){return Object(c["unref"])(t).restart()})},"Restart")]),Object(c["createElementVNode"])("li",null,[Object(c["unref"])(t).playing?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,onClick:n[4]||(n[4]=function(e){return Object(c["unref"])(t).pause()})}," Pause ")):(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:1,onClick:n[5]||(n[5]=function(e){return Object(c["unref"])(t).play()})}," Play "))])])])])}}});const Ue=De;var Te=Ue,ze={class:"instance"},Pe=Object(c["createElementVNode"])("dt",null,"CPU",-1),Ae=Object(c["createElementVNode"])("dt",null,"Memory",-1),$e=Object(c["defineComponent"])({__name:"Instance",props:{cpu:null,memory:null},setup:function(e){return function(t,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createElementVNode"])("dl",ze,[Pe,Object(c["createElementVNode"])("dd",null,Object(c["toDisplayString"])(e.cpu),1),Ae,Object(c["createElementVNode"])("dd",null,Object(c["toDisplayString"])(e.memory),1)]),Object(c["renderSlot"])(t.$slots,"default")],64)}}});const Fe=$e;var Ie=Fe,Re={class:"container"},qe=Object(c["createElementVNode"])("dt",null,"CPU",-1),Ge=Object(c["createElementVNode"])("dt",null,"Memory",-1),Le=Object(c["defineComponent"])({__name:"InstanceContainer",props:{cpu:null,memory:null},setup:function(e){return function(t,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("dl",Re,[qe,Object(c["createElementVNode"])("dd",null,Object(c["toDisplayString"])(e.cpu),1),Ge,Object(c["createElementVNode"])("dd",null,Object(c["toDisplayString"])(e.memory),1)])}}});const Je=Le;var We=Je,He={id:"simulation"},Ke=Object(c["createElementVNode"])("header",null,"Simulation",-1),Qe=Object(c["createElementVNode"])("dt",null,"ASG Scaling cooldown",-1),Xe=Object(c["createElementVNode"])("dt",null,"ECS Scaling cooldown",-1),Ye={class:"instances"},Ze={class:"containers"},et=Object(c["defineComponent"])({__name:"Simulation",setup:function(e){var t=W("asg"),n=G("ecs");return function(e,o){return Object(c["openBlock"])(),Object(c["createElementBlock"])("output",He,[Ke,Object(c["createElementVNode"])("dl",null,[Qe,Object(c["createElementVNode"])("dd",null,Object(c["toDisplayString"])(Object(c["unref"])(t).cooldown)+" seconds",1),Xe,Object(c["createElementVNode"])("dd",null,Object(c["toDisplayString"])(Object(c["unref"])(n).cooldown)+" seconds",1)]),Object(c["createElementVNode"])("section",null,[Object(c["createElementVNode"])("ul",Ye,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(t).instances.items,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{key:e.$id},[Object(c["createVNode"])(Ie,{cpu:e.size.cpu,memory:e.size.memory},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("ul",Ze,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.containers.items,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{key:e.$id},[Object(c["createVNode"])(We,{cpu:e.cpu,memory:e.memory},null,8,["cpu","memory"])])})),128))])]})),_:2},1032,["cpu","memory"])])})),128))])])])}}});const tt=et;var nt=tt,ct=Object(c["defineComponent"])({__name:"App",setup:function(e){return function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createVNode"])(le),Object(c["createVNode"])(ye),Object(c["createVNode"])(Te),Object(c["createVNode"])(nt)],64)}}});n("835c");const ot=ct;var rt=ot,lt=Object(c["createApp"])(rt);lt.use(Object(o["a"])()),lt.mount("#app")}});