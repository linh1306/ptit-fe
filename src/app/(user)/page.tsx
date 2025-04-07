// "use client";
// import { useModal } from "@app/context/Modal.context";
// import MDEditor from "@uiw/react-md-editor";
// import React from "react";

// export default function Home() {
//   const { openModal } = useModal();
//   const [value, setValue] = React.useState<string | undefined>(
//     "**Hello world!!!**"
//   );
//   return (
//     <div className="container">
//       <button onClick={() => openModal("modal", <div>dsaohd</div>)}>
//         Open Modal
//       </button>
//       <MDEditor value={value} onChange={(value) => setValue(value)} />
//       <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
//     </div>
//   );
// }


export default function Home() {
  return <div>Home</div>;
}
