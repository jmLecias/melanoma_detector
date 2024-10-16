import TOURS from "./TYPES";
import TypesContent from "../components/TypesContent";
import CausesContent from "../components/CausesContent";
import SymptomsContent from "../components/SymptomsContent";

export default [
    {
        id: 1,
        title: "Types",
        content: <TypesContent />,
    },
    {
        id: 2,
        title: "Causes",
        content: <CausesContent />,
    },
    {
        id: 3,
        title: "Symptoms",
        content: <SymptomsContent />,
    },
];