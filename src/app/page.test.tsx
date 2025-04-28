import { render, act } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Home from './page';
import '@testing-library/jest-dom';

describe('Checklist Functionality', () => {
  it('Checking a checkbox should increase the percentage of the progress bar for a section', async () => {
    const { container } = render(<Home />);
    console.log(container.innerHTML);

    // Find the first checkbox
    const checkbox = await screen.findByRole('checkbox', { name: /Implement strong password policies/i });

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
    const checkbox = await screen.findByRole('checkbox', { name: /Implement strong password policies/i });

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
  
    it('should persist checkbox states after page reload', async () => {
      render(<Home />);
  
      // Find the first checkbox
      const checkbox = await screen.findByRole('checkbox', { name: /Implement strong password policies/i });
  
      // Check the checkbox
      await act(async () => {
        fireEvent.click(checkbox);
      });
  
      // Reload the page
      window.location.reload();
  
      // Find the checkbox again
      const reloadedCheckbox = await screen.findByRole('checkbox', { name: /Implement strong password policies/i });
  
      // Check if the checkbox is still checked
      expect(reloadedCheckbox).toBeChecked();
    });

  it('Checking a checkbox should increase the overall progress and unchecking should decrease it', async () => {
    render(<Home />);

    // Find the first checkbox
    const checkbox = await screen.findByRole('checkbox', { name: /Implement strong password policies/i });
    const header = screen.getByTestId('overall-progress-section');

    // Get the initial progress value
    const initialProgressText = header.textContent;
    const initialProgress = parseFloat(initialProgressText?.match(/(\d+\.?\d*)%/)?.[1] || '0');

    // Check the checkbox
    fireEvent.click(checkbox);
    
    // Get the updated progress value
    const updatedProgressText = header.textContent;
    const updatedProgress = parseFloat(updatedProgressText?.match(/(\d+\.?\d*)%/)?.[1] || '0');

    // Assert that the progress has increased
    expect(updatedProgress).toBeGreaterThan(initialProgress);

    // Uncheck the checkbox
    fireEvent.click(checkbox);

    // Get the final progress value
    const finalProgressText = header.textContent;
    const finalProgress = parseFloat(finalProgressText?.match(/(\d+\.?\d*)%/)?.[1] || '0');

    // Assert that the progress has decreased
    expect(finalProgress).toBeLessThan(updatedProgress);
  });
});