import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

interface ReceiptProps{
user:string;
item:any;
dateTime:any;
location:any;
}

const Receipt:React.FC<ReceiptProps> = ({ user, item, dateTime, location }) => {
  return (
    <Document>
      <Page size="A4" className="flex gap-5 flex-col">
        <Text className="text-3xl uppercase m-auto w-fit font-semibold ">Order Receipt</Text>
        <View>
          <Text>Name: {user.name}</Text>
          </View>
          <View>
          <Text>Email: {user.email}</Text>
        </View>
        <View>
          <Text>Product Name: {item.productName}</Text>
          </View>
          <View>
          <Text >Price: ${item.price}</Text>
          </View>
          <View>
          <Text>Quantity: {item.quantity}</Text>
        </View>
        <Text >Date & Time: {dateTime}</Text>
        <Text>Location: {location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : "Location not available"}</Text>
      </Page>
    </Document>
  );
};

export default Receipt;
