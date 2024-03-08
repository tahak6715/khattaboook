/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const IndividulSupplierReport = ({ route, navigation }) => {
  const { Data } = route.params;
  const customerData = Data && Data.name ? Data.name : '';
  const response = Data && Data.amount ? Data.amount : [];
  const phoneNumber = Data.phoneNumber;

  const [selectedInterval, setSelectedInterval] = useState('all');
  const [filteredData, setFilteredData] = useState(response);
  const [totalIGave, setTotalIGave] = useState(0);
const [totalIGot, setTotalIGot] = useState(0);
const [totalAmot, setTotalAmot] = useState(0);
const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));




const initialStartDate = response.length > 0 ? new Date(response[0].time) : new Date();
const [startDate, setStartDate] = useState(initialStartDate);


  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);


  const calculateInitialSums = () => {
    let totalIGave = 0;
    let totalIGot = 0;

    // Calculate totals without filtering
    response.forEach((item) => {
      if (item.amount === 'i gave') {
        totalIGave += item.comand;
      } else if (item.amount === 'I got') {
        totalIGot += item.comand;
      }
    });

    setTotalIGave(totalIGave);
    setTotalIGot(totalIGot);
  };

  // Calculate initial sums on component mount
  useEffect(() => {
    calculateInitialSums();
  }, []);

  const intervalOptions = [
    { label: 'All', value: 'all' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const onIntervalChange = (value) => {
    setSelectedInterval(value);
    filterDataByDateRange(startDate, endDate, value);
  };



  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      filterDataByDateRange(selectedDate, endDate);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
      filterDataByDateRange(startDate, selectedDate);
    }
  };

  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const toggleEndDatePicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };


  

  const filterDataByDateRange = (start, end, interval) => {
    let filteredData;
    let totalIGave = 0;
    let totalIGot = 0;
  
    if (interval === 'all') {
      // For 'all', show all data without filtering by date range
      filteredData = response;
    } else {
      // Filter data by date range
      filteredData = response.filter((item) => {
        if (item.time && moment(item.time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()) {
          const itemDate = moment(item.time, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
          switch (interval) {
            case 'daily':
              return itemDate.isSameOrAfter(start, 'day') && itemDate.isSameOrBefore(end, 'day');
            case 'weekly':
              return itemDate.isSameOrAfter(start, 'week') && itemDate.isSameOrBefore(end, 'week');
            case 'monthly':
              return itemDate.isSameOrAfter(start, 'month') && itemDate.isSameOrBefore(end, 'month');
            default:
              return false; // This should not happen
          }
        }
        return false;
      });
  
      // Calculate totals
      filteredData.forEach((item) => {
        if (item.amount === 'i gave') {
          totalIGave += item.comand;
        } else if (item.amount === 'I got') {
          totalIGot += item.comand;
        }
      });
    }
  
    setTotalIGave(totalIGave);
    setTotalIGot(totalIGot);
  
    setFilteredData(filteredData);
  };
  
  
  

  const renderItem = ({ item, index }) => {
    const transactionSum = filteredData.slice(0, index + 1).reduce((acc, transaction) => {
      if (transaction.amount === 'I got') {
        return acc - transaction.comand;
      } else {
        return acc + transaction.comand;
      }
    }, 0);

    const formattedDateea = moment(item.time).format('D MMM YYYY');
    
    return (
    <>
      <View className="flex-row bg-gray-400 my-[0.5] rounded-xl my-1" key={index}>
        <View className="min-w-[50%] max-w-[50%] py-4  my-2 flex-col">
          <Text className="text-md pl-4 font-bold text-black  ">{formattedDateea}</Text>
          <Text className="text-xs pl-4 font-semibold text-black ">Bal: {transactionSum}</Text>
        </View>
        <View className="min-w-[25%] max-w-[25%]">
          <Text className="text-sm pl-4 font-semibold text-black bg-green-400 py-2  my-2">
            {item.amount === 'i gave' ? item.comand : ''}
          </Text>
        </View>
        <View className="min-w-[25%] max-w-[25%]">
          <Text className="text-sm pl-4 font-semibold text-black  my-2 bg-red-400 py-2">
            {item.amount === 'I got' ? item.comand : ''}
          </Text>
        </View>
      </View>
    </>
  );}


  const generateHTML = () => {
    const groupedData = filteredData.reduce((acc, item) => {
      const key = selectedInterval === 'weekly'
        ? moment(item.time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MMMM - W')
        : moment(item.time, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MMMM');
  
      if (!acc[key]) {
        acc[key] = {
          debit: 0,
          credit: 0,
          quantityDebit: 0,
          quantityCredit: 0,
          balance: 0,
          items: [],
        };
      }
  
      const formattedDate = moment(item.time).format('D MMM YYYY');
      acc[key].items.push({ ...item, formattedDate });
  
      if (item.amount === 'i gave') {
        acc[key].debit += parseFloat(item.comand);
        acc[key].quantityDebit += parseInt(item.quantity);
      } else if (item.amount === 'I got') {
        acc[key].credit += parseFloat(item.comand);
        acc[key].quantityCredit += parseInt(item.quantity);
      }
  
      acc[key].balance += item.amount === 'i gave' ? -parseFloat(item.comand) : parseFloat(item.comand);
      return acc;
    }, {});
  
    const tableRows = Object.entries(groupedData).map(([interval, data]) => {
      let runningBalance = 0;  // Initialize running balance for each interval
      const intervalRows = data.items.map(item => {
        // Calculate running balance for each transaction
        runningBalance += (item.amount === 'i gave' ? -parseFloat(item.comand) : parseFloat(item.comand));
  
        return `
          <tr>
          ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td>${item.formattedDate}</td>` : ''}

            ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td>${item.itemName}</td>` : ''} <!-- Include/exclude date column -->
         
            ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td class="red">${item.amount === 'i gave' ? item.quantity : ''}</td>` : ''}
            ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td class="green">${item.amount === 'I got' ? item.quantity : ''}</td>` : ''}
            ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td class="red">${item.amount === 'i gave' ? item.comand : ''}</td>` : ''}
            ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td class="green">${item.amount === 'I got' ? item.comand : ''}</td>` : ''}
            ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td>Rs:${runningBalance.toFixed(0)}</td>` : ''}
          </tr>
        `;
      }).join('');
  
      return `
        <tr>
          ${selectedInterval === 'daily' ? `<td colspan="5" class="interval-heading">${interval}</td>` : `<td colspan="5" class="interval-heading">${interval}</td>`} <!-- Include/exclude interval heading -->
        </tr>
        ${intervalRows}
        <tr>
          <td colspan="2" class="totals-column">${selectedInterval === 'daily' ? 'Monthly Total' : selectedInterval === 'weekly' ? 'Weekly Total' : 'Monthly Total'}:</td>
          ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td class="totals-column">${data.quantityDebit.toFixed(0)}</td>` : ''}
          ${(selectedInterval === 'daily' || selectedInterval === 'all') ? `<td class="totals-column">${data.quantityCredit.toFixed(0)}</td>` : ''}
          <td class="totals-column red">${data.debit.toFixed(0)}</td>
          <td class="totals-column green">${data.credit.toFixed(0)}</td>
          <td class="totals-column">${data.balance.toFixed(0)}</td>
        </tr>
      `;
    }).join('');
  
    const grandTotalDebit = Object.values(groupedData).reduce((acc, data) => acc + data.debit, 0);
    const grandTotalCredit = Object.values(groupedData).reduce((acc, data) => acc + data.credit, 0);
    const grandTotalBalance = Object.values(groupedData).reduce((acc, data) => acc + data.balance, 0);
    const grandTotalBalanceLabel = grandTotalBalance >= 0 ? 'Credit' : 'Debit';
  
    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title class="heading">Customer Report</title>
          <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
            margin: 0;
          }
          .container {
            margin: 10px;
          }
          .blue-bg {
            background-color: blue;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            color: white;
            margin: 0px;
          }
         
          .heading {
            font-size: 30px;
            color: black;
            margin-bottom: 10px;
          }
          .start-using-app {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: blue;
            padding: 10px;
            text-align: center;
            color: white;
          }
          .totals-column {
            font-weight: bold;
            padding: 10px;
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
          .totals-row {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            margin-vertical: 20px;
          }
          .month-heading {
            border: none;
            text-align: left;
          }
          .green {
            /* Light green background */
            color: #000000; /* White text color for better visibility on a light background */
            font-weight: bold;
          }
          
          .red {
            /* Light red background */
            color: #000000;
            font-weight: bold; /* White text color for better visibility on a light background */
          }
          .txt1{
            font-size: 20px;
            color: white;
            margin-bottom: 0px;
            padding-top: -10px;
          }
          .txt2{
            font-size: 15px;
            color: white;
            margin-bottom: 0px;
            margin-top: 0px;
            padding-top: -10px;
          }

          .cent{
            text-align: center;
          }

          .p21{
            padding-right: 10px;
            padding-top: 10px;
          }
          
        </style>
        </head>
        <body>
          <div class="container">
            <div class="blue-bg">
              <div>
                <h5 class="txt1" >${customerData}</h5>
                <h6 class="txt2">${phoneNumber}</h6>
              </div>
              <div class="p21">
                AL - MUSTAFA GARMENTS
              </div>
            </div>
            
            <table class="report-table">
              <thead>
                <tr>
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Date</th>` : ''}
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Details</th>` : `<th colspan="2" ></th>`}
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Quantity Debit</th>` : ''}
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Quantity Credit</th>` : ''}
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Debit</th>` : `<th>Debit</th>`}
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Credit</th>` : `<th>Credit</th>`}
                  ${(selectedInterval === 'daily' || selectedInterval === 'all')  ? `<th>Balance</th>` : `<th>Balance</th>`}
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
            <div class="totals-row">
              <div class="totals-column" colspan="2">Grand Total</div>
              <div class="totals-column red">Debit: ${grandTotalDebit.toFixed(0)}</div>
              <div class="totals-column green">Credit: ${grandTotalCredit.toFixed(0)}</div>
              <div class="totals-column">Balance: ${grandTotalBalance.toFixed(0)}
                <div class="cent" >(${grandTotalBalanceLabel})</div>
              </div>
            </div>
            <div class="start-using-app">Start using Al Mustafa Garments app now! Install</div>
          </div>
        </body>
      </html>
    `;
  };
  
  

  const generatePDF = async () => {
    try {
      const downloadsPath = RNFS.DownloadDirectoryPath;
      const pdfDirectoryPath = `${downloadsPath}`;
      await RNFS.mkdir(pdfDirectoryPath);
  
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const fileName = `${customerData}_${timestamp}.pdf`;
  
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

  const sharePDF = async () => {
    try {
      const pdfFilePath = await generatePDF();
  
      const options = {
        title: 'Share Report',
        message: 'Check out this report!',
        url: `file://${pdfFilePath}`,
        type: 'application/pdf',
      };
  
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing PDF:', error);
      // Handle error, show error message, or navigate to an error screen
    }
  };
  


  

 

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Custom Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Customer', {}, -2)}>
        <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, marginLeft: 8 }} className="font-semibold text-black ">
          {customerData}'s Report
        </Text>
      </View>

      
      <View className="flex-row self-center  ">
      <View className="mx-2 my-auto border-b-4 border-black rounded-xl py-4 px-2 bg-gray-300">
        <TouchableOpacity onPress={toggleStartDatePicker} className="  px-2  flex-row">
          {showStartDatePicker && (
            <DateTimePicker value={startDate} mode="date" is24Hour={true} display="default" onChange={onChangeStartDate} />
          )}
          <Text className="text-black dark:text-white mx-auto">{startDate.toString().substr(4, 12)}</Text>
        </TouchableOpacity>
      </View>

      <View  className="mx-2 my-auto border-b-4 border-black rounded-xl py-4 px-2 bg-gray-300">
        <TouchableOpacity onPress={toggleEndDatePicker} className="   px-2  flex-row">
          {showEndDatePicker && (
            <DateTimePicker value={endDate} mode="date" is24Hour={true} display="default" onChange={onChangeEndDate} />
          )}
          <Text className="text-black dark:text-white mx-auto">{endDate.toString().substr(4, 12)}</Text>
        </TouchableOpacity>
      </View>

      </View>
      <View className="bg-gray-200 rounded-xl mt-1">
      <RNPickerSelect className="text-black"
        onValueChange={onIntervalChange}
        items={intervalOptions}
        value={selectedInterval}
      />
      </View>

      <View>
        {/* <Text>{totalAmot}</Text>
        <View>
    <Text className="text-md pl-4 font-extrabold text-black ">I have to get</Text>
    <Text className="text-md pl-4 font-light text-red-600  ">{totalAmot}</Text>
  </View> */}

        <View className="flex-row pt-2 bg-gray-300 rounded-lg mt-2">
          <View className="min-w-[50%] max-w-[50%]">
            <Text className="text-md pl-4 font-bold text-black ">Date</Text>
          </View>
          <View className="min-w-[25%] max-w-[25%]">
            <Text className="text-md pl-4 font-bold text-black  ">I gave</Text>
            <Text className="text-sm pl-4 font-semibold text-green-600  ">{totalIGave}</Text>

          </View>
          <View className="min-w-[25%] max-w-[25%]">
            <Text className="text-md pl-4 font-bold text-black ">I got</Text>
            <Text className="text-sm pl-4 font-semibold text-red-600  ">{totalIGot}</Text>
          </View>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          className="max-h-[70%] min-h-[70%]"
        />
      </View>

      <View className="absolute top-[94%] flex-row rounded-xl mx-auto px-6 py-2 self-center ">
        <TouchableOpacity className="mx-2 bg-black py-2 px-4 rounded-xl"  onPress={generatePDF}>
            <Text className="text-lg  font-bold mx-auto text-white self-center ">Download</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mx-2 bg-black py-2 px-4 rounded-xl" onPress={sharePDF}>
  <Text className="text-lg font-bold mx-auto text-white self-center">WhatsApp</Text>
</TouchableOpacity>

      </View>
      
    </View>
  );
};

export default IndividulSupplierReport;

const styles = StyleSheet.create({});
