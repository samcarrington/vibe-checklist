import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

describe('Checklist Functionality', () => {
  it('Checking a checkbox should increase the percentage of the progress bar for a section', async () => {
    render(<Home />);

    // Find the first checkbox
    const checkbox = screen.getByRole('checkbox', { name: 'Item 1' });

    // Find the progress bar
    const progressBar = screen.getByTestId('section-1-progress-bar');
    const initialWidth = progressBar.style.width;

    // Check the checkbox
    fireEvent.click(checkbox);

    // Check if the progress bar width has increased
    const newWidth = progressBar.style.width;
    expect(newWidth).not.toBe(initialWidth);
  });

  it('Unchecking a checkbox should reduce the percentage of the progress bar for a section', async () => {
    render(<Home />);

    // Find the first checkbox
    const checkbox = screen.getByRole('checkbox', { name: 'Item 1' });

    // Check the checkbox first
    fireEvent.click(checkbox);

    // Find the progress bar
    const progressBar = screen.getByTestId('section-1-progress-bar');
    const initialWidth = progressBar.style.width;

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Check if the progress bar width has decreased
    const newWidth = progressBar.style.width;
    expect(newWidth).not.toBe(initialWidth);
  });

  it('Checking a checkbox should increase the percentage of the overall progress component', async () => {
    render(<Home />);

    // Find the first checkbox
    const checkbox = await screen.findByRole('checkbox', { name: /Item 1/i });

    // Check the checkbox
    fireEvent.click(checkbox);

    // Find the overall progress element
    const overallProgressElement = await screen.findByText(/%/);

    // Get the initial progress value
    const initialProgress = overallProgressElement.textContent;

    // Check the checkbox again
    fireEvent.click(checkbox);

    // Find the updated overall progress element
    const updatedOverallProgressElement = await screen.findByText(/%/);

    // Get the updated progress value
    const updatedProgress = updatedOverallProgressElement.textContent;

    // Assert that the progress has changed
    expect(updatedProgress).not.toBe(initialProgress);
  });
});