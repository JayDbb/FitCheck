import { View, Text, TextInput } from "react-native";
import { label } from "@bacons/apple-colors";

type ListItem = {
  label: string;
  value: string | number;
};

type ListsProps = {
  title?: string;
  items: ListItem[];
  inputID?: string;
  setCaption?: React.Dispatch<React.SetStateAction<string>>;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
};

const Lists = ({ title, items, inputID, setCaption, setCategory }: ListsProps) => {
  const handleInputChange = (label: string, newValue: string) => {
    if (label === "Caption" && setCaption) {
      setCaption(newValue); // Set caption when "Caption" field changes
    } else if (label === "Category" && setCategory) {
      setCategory(newValue); // Set category when "Category" field changes
    }
  };

  return (
    <View>
      {title && <Text>{title}</Text>}
      <View
        style={{
          backgroundColor: "rgba(120,120,128,0.12)",
          borderRadius: 12,
          overflow: "hidden",
          paddingHorizontal: 16,
        }}
      >
        {items.map((item, index) => (
          <View
            key={item.label}
            style={{
              paddingVertical: 10,
              alignItems: "center",
              flexDirection: "row",
              borderBottomWidth: index === items.length - 1 ? 0 : 0.5,
              borderBottomColor: "rgba(120,120,128,0.2)",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: label,
                opacity: 0.8,
                flex: 1,
              }}
            >
              {item.label}
            </Text>

            <TextInput
              value={item.value.toString()}
              onChangeText={(newValue) => handleInputChange(item.label, newValue)}
              placeholder="Enter text"
              inputAccessoryViewID={inputID}
              style={{
                fontSize: 16,
                color: label,
                flex: 1,
                textAlign: "right",
                backgroundColor: "white",
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Lists;
