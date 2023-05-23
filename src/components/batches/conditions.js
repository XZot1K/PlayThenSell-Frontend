function conditions() {
  return [
    { value: "new", label: "New" },
    { value: "very-good", label: "Very Good" },
    { value: "good", label: "Good" },
    { value: "acceptable", label: "Acceptable" },
  ];

  const [selectedCondition, setSelectedCondition] = useState(
    conditions[0].label
  );
  const handleSelect = (condition) => {
    setSelectedCondition(condition);
  };
}

export default conditions;
