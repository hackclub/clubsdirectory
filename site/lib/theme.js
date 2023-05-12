import base from "@hackclub/theme";
import { merge } from "lodash";

const theme = base;

theme.useColorSchemeMediaQuery = false;

theme.layout.copy.maxWidth = [null, null, "copyPlus"];

theme.text.title.fontSize = [5, 6];

export default theme;
