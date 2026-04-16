export default function ComboBar({ streak, getColor }) {
  return (
    <div style={wrapper}>
      <div style={bar}>
        <div
          style={{
            ...fill,
            width: `${Math.min(streak * 12, 100)}%`,
            background: getColor(),
          }}
        />
      </div>
    </div>
  );
}

const wrapper = {
  display: "flex",
  justifyContent: "center",
  margin: "10px 0",
};

const bar = {
  width: "180px",
  height: "6px",
  background: "#0f172a",
  borderRadius: "10px",
  overflow: "hidden",
};

const fill = {
  height: "100%",
  transition: "0.3s ease-out",
};