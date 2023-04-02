sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library, JSONModel) {
    "use strict"
    var urlObject = library.URLHelper

    return Controller.extend("consultaprodutos.controller.Main", {
      onInit: function () {
        let produto = {}
        let productModel = new JSONModel(produto)
        let view = this.getView()
        view.setModel(productModel, "ModeloProduto")
      },

      OnClickImage: function (oEvent) {
        urlObject.redirect(oEvent.getSource().getSrc(), true)
      },

      onPressBuscar: function () {
        let input;
        input = this.byId("inpBusca");
        let valor = input.getValue()
        // alert("" + input);

        let parameters = {
          url: "https://world.openfoodfacts.org/api/v2/product/" + valor,
          method: "GET",
          async: true,
          crossDomain: true,
        }
        //promise = Quando uma função retorna como parametro de exportação outra função

        $.ajax(parameters).done(function(response){
          let oDatasModel = this.getView().getModel("ModeloProduto");
          //Clear
          oDatasModel.setData({});
          oDatasModel.refresh();
          oDatasModel.setData(response);
          oDatasModel.refresh();

      }.bind(this) )
      .fail(function(){
        
      }.bind(this) );

      },
    })
  }
)
