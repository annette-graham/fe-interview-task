import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface GenreFilterProps {
  genres: string[];
  onFilterChange: (genre: string | null) => void;
}

function GenreFilter({ genres, onFilterChange }: GenreFilterProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, mb: 2 }}>
      <Autocomplete
        sx={{ width: 300 }}
        options={genres}
        onChange={(_event, value) => onFilterChange(value)}
        renderInput={(params) => (
          <TextField {...params} label='Filter by genre' />
        )}
      />
    </Box>
  );
}

export default GenreFilter;
