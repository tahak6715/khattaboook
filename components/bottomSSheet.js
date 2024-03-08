// import { StyleSheet, Text, View } from 'react-native'
// import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
// import BottomSheet from '@gorhom/bottom-sheet'

// const bottomSSheet1 = forwardRef((props, ref) => {

//     const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])

//     useImperativeHandle(ref, () => ({
//         openBottomSheet: () => {
//           ref.current.expand(); // Adjust the index based on your snap points
//         },
//       }));

//   return (
//     <BottomSheet
//     ref={ref}
//     index={1}
//     snapPoints={snapPoints}
//     enablePanDownToClose={true}
//     backgroundStyle={{backgroundColor: 'red'}}
//     handleIndicatorStyle={{backgroundColor: 'blue'}}
//     >
//         <View style={styles.contentContainer}>
//             <Text style={styles.containerHeadline} >{props.title}</Text>
//         </View>



//     </BottomSheet>
//   )
// })

// export default bottomSSheet1

// const styles = StyleSheet.create({
//     contentContainer: {
//         flex: 1,
//         alignItems: 'center',
//     },
//     containerHeadline: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: 'black',
//         padding: 20,
//     },
// })