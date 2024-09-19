from selenium import webdriver

# Initialize WebDriver (specify the path to your geckodriver it it's not in your environment path)
driver = webdriver.Firefox()

# Navigate to a website
driver.get("https://www.joshwcomeau.com/shadow-palette/")

# Print the title of the page to verify
print(driver.title)

# Close the browser
driver.quit()
