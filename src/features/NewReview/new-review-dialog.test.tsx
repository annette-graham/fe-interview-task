import { render } from '@testing-library/react';

import NewReviewDialog from './new-review-dialog';

describe('NewReviewDialog', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <NewReviewDialog
        autoCompleteOptions={['test', 'test2']}
        isOpen
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(container).toBeInTheDocument();
  });
});


// TODO: add more tests if time allows