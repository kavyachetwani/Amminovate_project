import React from "react";
import localImage from "../assets/verified.jpg";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    position: "relative",
  },
  header: {
    fontSize: 25,
    marginBottom: 30,
    textAlign: "center",
    color: "black",
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    borderBottom: "1px solid black",
  },
  travelsubtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    borderBottom: "1px solid black",
  },
  table: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    paddingVertical: 5,
  },
  cell1: {
    flex: 0.4, // Left column width as 40%
    padding: 5,
    fontSize: 14,
  },
  cell: {
    flex: 0.6, // Right column width as 60%
    padding: 5,
    fontSize: 14,
    borderLeft: "1px solid black",
    paddingHorizontal: 19,
  },
  image: {
    position: "absolute",
    bottom: "0%", // Align image to the bottom of the page
    right: "5%", // Align image to the right side of the page
    width: "200", // Width of the image relative to the page
    height: "200", // Height of the image relative to the page
    margin: 0, // Height of the image
  },
});

const RailwayPDF = ({ student }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Railway Concession Application</Text>

        {/* Student Details */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Student Details</Text>
          <View style={styles.table}>
            {/* Table Header */}

            {/* Table Rows */}
            <View style={styles.row}>
              <Text style={styles.cell1}>Student Name</Text>
              <Text style={styles.cell}>{student.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell1}>Address</Text>
              <Text style={styles.cell}>{student.address}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell1}>Branch</Text>
              <Text style={styles.cell}>{student.branch}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell1}>Aadhar</Text>
              <Text style={styles.cell}>{student.aadhar}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell1}>Year</Text>
              <Text style={styles.cell}>{student.year}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell1}>Date of Birth</Text>
              <Text style={styles.cell}>{student.dob}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell1}>Mobile No</Text>
              <Text style={styles.cell}>{student.mobile}</Text>
            </View>
          </View>
        </View>

        {/* Travel Details */}
        <View style={styles.section}>
          <Text style={styles.travelsubtitle}>Travel Details</Text>
          <View style={styles.table}>
            {/* Table Rows */}
            <View style={styles.row}>
              <Text style={styles.cell}>Travelling From</Text>
              <Text style={styles.cell}>{student.travelFrom}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Travelling To</Text>
              <Text style={styles.cell}>{student.travelTo}</Text>
            </View>
          </View>
        </View>
        <Image style={styles.image} src={localImage} />
      </Page>
    </Document>
  );
};
export default RailwayPDF;
