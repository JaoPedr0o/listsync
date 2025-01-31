import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export const shareList = async (listName: string, listItems: any) => {
  const totalItems = listItems.length;

  const htmlContent = `
      <html>
        <head>
          <style>
            body { 
              display: flex;
              flex-direction: column;
              gap: 10px;
              justify-content: center;
              font-family: Arial, sans-serif; 
              padding: 20px; 
              background-color: #FFFFFF;
              text-align: center;
            }
            h1 { 
              text-align: center;
              font-size: 22px;
              font-weight: 900;
              color: #FFFFFF;
              background-color: #000000;
              padding: 10px;
              border-radius: 10px;
              box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            }
            .container {
              text-align: center;
              font-size: 22px;
              font-weight: 900;
              color: #000000;
              background-color: #FFFFFF;
            }
            .item { 
              display: flex;
              align-items: center;
              justify-content: space-between;
              background-color: #E0E4EA;
              padding: 10px 20px;
              border-radius: 10px;
              margin-bottom: 10px;
              font-size: 16px;
              font-weight: bold;
            }
            .item-name { 
              color: #000; 
              font-weight: bold;
            }
            .checkbox {
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
            .item-div {
              display: flex;
              align-items: center;
            }
            .summary {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;
              font-size: 18px;
              font-weight: bold;
              padding: 10px;
              background-color: #FFF;
              border: 2px solid #000;
              color: #000;
              border-radius: 10px;
              text-align: center;
            }
            .total-line {
              display: inline-block;
              width: 150px;
              border-bottom: 2px solid #000;
              margin-left: 10px;
            }
          </style>
        </head>
        <body>
          <h1>${listName}</h1>
          <div class="container">
            ${listItems
              .map(
                (item: { itemName: string; itemQuantity: string; itemType: string }) => `
                <div class="item">
                  <div class="item-div">
                    <input class="checkbox" type="checkbox">
                    <span class="item-name">${item.itemName}</span>
                  </div>
                  <span class="item-name">${item.itemQuantity} - ${item.itemType}</span>
                </div>
              `
              )
              .join('')}
            
            <div class="summary">
              <span>Total de itens: ${totalItems}</span>
              <span>Total da compra: <span class="total-line"></span></span>
            </div>
          </div>
        </body>
      </html>
    `;

  const file = await Print.printToFileAsync({
    html: htmlContent,
    base64: false,
  });

  await shareAsync(file.uri);
};
