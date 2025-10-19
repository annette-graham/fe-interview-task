import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

function NewReviewDialog({
  autoCompleteOptions,
  isOpen,
  onClose,
  onSubmit,
}: {
  autoCompleteOptions: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog sx={{ minWidth: '600px' }} open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: 'primary.main' }}>New Review</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} id='new-review-form'>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Autocomplete
              id='film-search'
              sx={{ width: 300, mt: 4, mb: 2 }}
              options={autoCompleteOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Search...'
                  name='filmTitle'
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: 'Search by film title',
                    },
                  }}
                />
              )}
            />
            <TextField
              id='review-text'
              sx={{ width: 300, mt: 2, mb: 2 }}
              label='Review'
              name='review_text'
              multiline
              rows={4}
              placeholder='Your review...'
            />
            <Rating
              id='film-rating'
              name='rating'
              precision={0.5}
              size='large'
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'text.primary' }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={{ color: 'text.primary' }}
          type='submit'
          form='new-review-form'
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewReviewDialog;
