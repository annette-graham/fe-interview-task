import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function NewReviewDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Dialog sx={{ minWidth: '600px' }} open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: 'primary.main' }}>New Review</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} id='new-review-form'>
          <Box>
            <Autocomplete
              id='film-search'
              sx={{ width: 300, mt: 4, mb: 2 }}
              options={['dummy', 'dummy2', 'dummy3']}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Search...'
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
              id='outlined-multiline-static'
              sx={{ width: 300, mt: 2, mb: 2 }}
              label='Review'
              multiline
              rows={4}
              placeholder='Your review...'
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
