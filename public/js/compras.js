window.onload = function () {

    let montoNeto = document.querySelector('#monto_neto');
    let iva = document.querySelector('#iva');
    let ivaMonto = document.querySelector('#iva_monto');
    let retencion = document.querySelector('#retencion');
    let retencionMonto = document.querySelector('#retencion_monto');

    if(montoNeto.value != "" && iva.value != "" ){
        let valor = (montoNeto.value * iva.value) / 100;
        ivaMonto.value = valor;
    }

    if(montoNeto.value != "" && retencion.value != "" ){
        let valor = (montoNeto.value * retencion.value) / 100;
        retencionMonto.value = valor;
    }


    iva.addEventListener('blur',function(){
        if(montoNeto.length != 0){
            let valor = (montoNeto.value * iva.value) / 100;
            ivaMonto.value = valor;
        }
    })

    retencion.addEventListener('blur',function(){
        if(montoNeto.length != 0){
            let valor = (montoNeto.value * retencion.value) / 100;
            retencionMonto.value = valor;
        }
    })

    montoNeto.addEventListener('blur',function(){
        if(iva.length != 0){
            let valor = (montoNeto.value * iva.value) / 100;
            ivaMonto.value = valor;
        }
        if(retencion.length != 0){
            let valor = (montoNeto.value * retencion.value) / 100;
            retencionMonto.value = valor;
        }
    })

}