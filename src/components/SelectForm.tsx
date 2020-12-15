import { Difficulty } from "../API";
// STYLES
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Props types for the component
type Props = {
  totalQuestions: number;
  difficulty: Difficulty;
  handleQuestionChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  handleDifficultyChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
};
// STYLES
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      // @media(max-width: 401px)
      [theme.breakpoints.down(401)]: {
        textAlign: "center",
      },
    },
  })
);
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const SelectForm = ({
  totalQuestions,
  difficulty,
  handleQuestionChange,
  handleDifficultyChange,
}: Props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="select-form">
        <FormControl className={classes.formControl}>
          <InputLabel style={{ color: "#333" }}>Questions</InputLabel>
          <Select value={totalQuestions} onChange={handleQuestionChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <FormHelperText>Choose number of questions</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel style={{ color: "#333" }}>Difficulty</InputLabel>
          <Select value={difficulty} onChange={handleDifficultyChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
          <FormHelperText>Choose question difficulty</FormHelperText>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectForm;
