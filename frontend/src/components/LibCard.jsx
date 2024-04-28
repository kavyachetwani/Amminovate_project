import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import LibStamp from "../assets/Library.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  headerContainer: {
    width: "100%",
    textAlign: "center",
    marginBottom: "7%",
    borderBottom: "1px solid black",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
  },
  mainTable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column1: {
    width: "60%",
  },
  column2: {
    width: "40%",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    borderRight: "1px solid black",
  },
  table1: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    paddingVertical: 6,
  },
  cell1: {
    flex: 0.7,
    padding: 5,
    fontSize: 14,
  },
  cell: {
    flex: 0.9,
    padding: 5,
    fontSize: 14,
    paddingHorizontal: 19,
  },
  rowhead: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    paddingVertical: 6,
    borderTop: "1px solid black",
  },
  image: {
    position: "absolute",
    right: "15%", // Align image to the right side of the page
    width: "125", // Width of the image relative to the page
    height: "150", // Height of the image relative to the page
    margin: 0, // Height of the image
  },
  stamp: {
    position: "absolute",
    bottom: "5%", // Align image to the bottom of the page
    right: "5%", // Align image to the right side of the page
    width: "150", // Width of the image relative to the page
    height: "150", // Height of the image relative to the page
    margin: 0, // Height of the image
  },
});

const LibCard = ({ student }) => {
  return (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>LIBRARY CARD</Text>
        </View>

        {/* Main Table */}
        <View style={styles.mainTable}>
          {/* Left Column */}
          <View style={styles.column1}>
            {/* Table 1 */}
            <View style={styles.table1}>
              <View style={styles.rowhead}>
                <Text style={styles.cell1}>Student Name:</Text>
                <Text style={styles.cell}>{student.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell1}>Student Email:</Text>
                <Text style={styles.cell}>{student.email}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell1}>Year:</Text>
                <Text style={styles.cell}>{student.year}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell1}>Branch:</Text>
                <Text style={styles.cell}>{student.branch}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell1}>UID:</Text>
                <Text style={styles.cell}>{student.uid}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell1}>Date Of Birth:</Text>
                <Text style={styles.cell}>{student.dob}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cell1}>Mobile No.:</Text>
                <Text style={styles.cell}>{student.mobile}</Text>
              </View>{" "}
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.column2}>
            {/* Table 2 */}
            <View style={styles.table}>
              {student.image && (
                <Image src={student.image} style={styles.image} />
              )}
            </View>
          </View>
        </View>

        {/* Main Table */}
        <View style={styles.mainTable}>
          {/* Left Column */}
          <View style={styles.column1}>
            {/* Table 3 */}
            <View style={styles.table}></View>
          </View>

          {/* Right Column */}
          <View style={styles.column2}>
            {/* Table 4 */}
            <View style={styles.table}></View>
          </View>
        </View>
        <Image src={LibStamp} style={styles.stamp} />
      </Page>
    </Document>
  );
};

export default LibCard;

{
  /* Student Image */
}
