import {getRequest} from "./api";
export const  initMenu=(router,store)=>{
    //如果有菜单数据就不在加载
    if(store.state.routes.length > 0){
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if(data){
            let fmtRoutes=formatRoutes(data);
            console.log(fmtRoutes);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes',fmtRoutes)
        }
    })
}
//将服务端的数据进行格式化处理
export const formatRoutes =(routes)=> {
    let fmtRoutes=[];
    routes.forEach(router => {
        let {
            id,
            path,
            component,
            name,
            meta,
            children
        }=router;
        if(children && children instanceof Array){
            children=formatRoutes(children)
        }
        let fmRouter={
            id:id,
            path:path,
            name:name,
            meta:meta,
            children:children,
            //component字段应该是一个对象而不是字符串，所以通过路径动态加载
            component(resolve){
                if(component.startsWith("Home")) {
                    require(['../views/'+component + '.vue'], resolve);
                }else if(component.startsWith("Emp")){
                    require(['../views/emp/' +component+'.vue'],resolve);
                }else if(component.startsWith("Role")){
                    require(['../views/role/' +component+'.vue'],resolve);
                }else if(component.startsWith("Menu")){
                    require(['../views/menu/' +component+'.vue'],resolve);
                }else if(component.startsWith("User")){
                    require(['../views/user/' +component+'.vue'],resolve);
                }else if(component.startsWith("Log")) {
                    require(['../views/log/' + component + '.vue'], resolve);
                }else if(component.startsWith("Product")){
                        require(['../views/product/' +component+'.vue'],resolve);
                }else if(component.startsWith("Order")){
                    require(['../views/order/' +component+'.vue'],resolve);
                }

            }
        }
        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes;
}