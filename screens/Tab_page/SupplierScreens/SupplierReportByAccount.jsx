/* eslint-disable prettier/prettier */
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from 'react-native-vector-icons/Entypo';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid } from 'react-native';
import moment from 'moment';


const SupplierReportByAccount = ({ navigation, route }) => {
  const { SupplierData } = route.params;
  const supplierData = SupplierData;

  const renderAmountRow = (amount, supplierName) => (
    <View className="flex-row py-2 px-2">
      <View className="w-[50%]">
        <Text>{}</Text>
      </View>
      <View className="w-[25%]">
        <Text>{amount.amount === 'i gave' ? amount.comand : ''}</Text>
      </View>
      <View className="w-[25%]">
        <Text>{amount.amount === 'I got' ? amount.comand : ''}</Text>
      </View>
    </View>
  );

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Download Successful',
      text2: 'The PDF has been downloaded successfully!',
    });
  };

  const renderSupplierRows = (supplier) => (
    <>
      {supplier.amount.map((amount) => {
        const formattedDateea = moment(amount.time).format('D MMM YYYY');
        return (
        <View className="flex-row  mx-2 my-1 py-1 bg-gray-400 rounded-lg ">
          <View className="w-[50%]">
            <Text className="text-md text-black pl-2 font-bold">{supplier.name}</Text>
            <Text className="text-xs text-black pl-2">{formattedDateea}</Text>
          </View>
          <View className="w-[25%] opacity-90">
            <Text className="text-green-600 self-center font-semibold my-auto pl-2">
              {amount.amount === 'i gave' ? amount.comand : '-'}
            </Text>
          </View>
          <View className=" w-[25%] my-auto ">
            <Text className="text-red-600 self-center font-semibold" pl-2>
              {amount.amount === 'I got' ? amount.comand : '-'}
            </Text>
          </View>
        </View>
      )})}
    </>
  );

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const toggleDatePicker = () => {
    setShow(!show);
    setMode('month');
  };

  const onChange = (e, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedMonth(selectedDate.getMonth());
    }
    setShow(false);
  };

  const filterDataByMonth = (data, selectedMonth) => {
    return data.filter((supplier) =>
      supplier.amount.some(
        (amount) => new Date(amount.time).getMonth() === selectedMonth
      )
    );
  };

  const filteredCustomerData = filterDataByMonth(supplierData, selectedMonth);


 
  // Call this function before attempting to generate or move the PDF
  



  const generateHTML = () => {
    const monthlyReports = {};
  
    const totalDebit = supplierData.reduce((acc, supplier) => {
      const debitAmount = supplier.amount
        .filter((amount) => amount.amount === 'i gave')
        .reduce((debitAcc, amount) => debitAcc + parseFloat(amount.comand), 0);
  
      return acc + debitAmount;
    }, 0);
  
    const totalCredit = supplierData.reduce((acc, supplier) => {
      const creditAmount = supplier.amount
        .filter((amount) => amount.amount === 'I got')
        .reduce((creditAcc, amount) => creditAcc + parseFloat(amount.comand), 0);
  
      return acc + creditAmount;
    }, 0);
  
    const netBalance = totalCredit - totalDebit;
    const netBalanceLabel = netBalance >= 0 ? 'Credit' : 'Debit';
  
    const monthOrder = [];
  
    supplierData.forEach((supplier) => {
      let runningBalance = 0;
  
      supplier.amount.forEach((amount) => {
        const monthKey = moment(amount.time).format('MMMM');
  
        if (!monthlyReports[monthKey]) {
          monthlyReports[monthKey] = {
            rows: [],
            totalDebit: 0,
            totalCredit: 0,
            totalBalance: 0,
          };
          if (!monthOrder.includes(monthKey)) {
            monthOrder.push(monthKey);
          }
          runningBalance = 0;
        }
  
        runningBalance += amount.amount === 'i gave' ? -parseFloat(amount.comand) : parseFloat(amount.comand);
  
        monthlyReports[monthKey].rows.push(`
          <tr>
            <td>${moment(amount.time).format('D MMM YYYY')}</td>
            <td>${supplier.name}</td>
            <td class="red">${amount.amount === 'i gave' ? amount.comand : '-'}</td>
            <td class="green">${amount.amount === 'I got' ? amount.comand : '-'}</td>
            <td>${runningBalance.toFixed(0)}</td>
          </tr>
        `);
  
        // Update monthly totals
        monthlyReports[monthKey].totalDebit += amount.amount === 'i gave' ? parseFloat(amount.comand) : 0;
        monthlyReports[monthKey].totalCredit += amount.amount === 'I got' ? parseFloat(amount.comand) : 0;
      });
    });
  
    const monthlyReportHTML = monthOrder.map((month) => {
      const { rows, totalDebit, totalCredit } = monthlyReports[month];
      const totalBalance = totalCredit - totalDebit;
  
      return `
        <tr>
          <td colspan="2" class="month-heading">${month} Total</td>
          <td class="red">${totalDebit.toFixed(0)}</td>
          <td class="green">${totalCredit.toFixed(0)}</td>
          <td>${totalBalance.toFixed(0)}</td>
        </tr>
        ${rows.join('')}
      `;
    }).join('');
  
    return `
      <html>
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title class="heading">Supplier Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          padding: 20px;
        }

        .container {
          margin: 10px;
        }

        .report-table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }

        .report-table th,
        .report-table td {
          border: 2px solid #ccc;
          padding: 12px;
          text-align: center;
        }

        .report-table th {
          background-color: #f2f2f2;
          margin-bottom: 10px;
        }

        .heading {
          font-size: 30px;
          color: black;
          margin-bottom: 10px;
        }

        .totals-row {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          margin-vertical: 20px;
        }

        .month-heading {
          background-color: #e0e0e0;
          font-weight: bold;
        }

        .debit {
          color: red;
        }

        .credit {
          color: green;
        }

        .cent {
          text-align: center;
        }
      </style>
    </head><head>
          <!-- Include your styles and meta tags here -->
        </head>
        <body>
          <div class="container">
            <h4>Summary Report</h4>
            <div class="totals-row">
              <div>Total Debit: ${totalDebit.toFixed(0)}</div>
              <div>Total Credit: ${totalCredit.toFixed(0)}</div>
              <div>Net Balance: ${netBalance.toFixed(0)}
                <div class="cent">(${netBalanceLabel})</div>
              </div>
            </div>
            <table class="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                ${monthlyReportHTML}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
  };
  
  
  

  
  

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'Your app needs access to storage for downloading PDF files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        return true;
      } else {
        console.log('Storage permission denied');
        return false;
      }
    } catch (error) {
      console.warn(error);
      return false;
    }
  };
  
  const generatePDF = async () => {
    try {
      const downloadsPath = RNFS.DownloadDirectoryPath;
      const pdfDirectoryPath = `${downloadsPath}`;
      await RNFS.mkdir(pdfDirectoryPath);
  
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const fileName = `${'suppliersData'}_${timestamp}.pdf`;
  
      const htmlContent = generateHTML();
      const options = {
        html: htmlContent,
        fileName: fileName,
        base64: true,
      };
  
      const results = await RNHTMLtoPDF.convert(options);
      const { filePath } = results;
  
      const newFilePath = `${pdfDirectoryPath}/${fileName}`;
      await RNFS.moveFile(filePath, newFilePath);

      
  
      console.log('PDF moved to Downloads:', newFilePath);
      return newFilePath;
  
      // Show success message or navigate to a success screen
    } catch (error) {
      console.error('Error generating or moving PDF:', error);
      // Handle error, show error message, or navigate to an error screen
    }
  };
  

  return (
    <>

    
      {/* Custom Header */}
      <View className="p-3" style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Supplier', {}, -1)}>
        <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, marginLeft: 8 }} className="font-semibold text-black ">
          Report Of Your Khata
        </Text>
      </View>
  
    

      <View className="mx-2 -mt-2 ">
        <View className="flex-row py-3 px-2 bg-gray-300 shadow-inherit shadow-2xl rounded-xl">
          <View className="w-[50%]">
            <Text className="font-bold text-black">Name</Text>
          </View>
          <View className=" w-[25%] my-auto ">
            <Text className="self-center font-bold text-black">I Gave</Text>
          </View>
          <View className=" w-[25%] my-auto ">
            <Text className="self-center font-bold text-black">I Got</Text>
          </View>
        </View>

        <FlatList
          className="max-h-[82%] min-h-[82%]"
          data={supplierData}
          renderItem={({ item }) => renderSupplierRows(item)}
          keyExtractor={(item) => item._id}
        />
      </View>

      <TouchableOpacity className="self-center mt-1 bg-black absolute top-[90%] max-w-[100%] rounded-lg  " onPress={generatePDF}>
        <Text className="text-center text-white p-4   font-bold" >
          Generate PDF
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default SupplierReportByAccount