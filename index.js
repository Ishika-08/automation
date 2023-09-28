const puppeteer = require("puppeteer")
const express = require('express')
const mongoose = require('mongoose')
const FAOModel = require("./Website")

const app = express()
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/TechWhoop")

app.get('/check-href', async (req, res) => {
    try {
      // Fetch the top 5 entries from the FAO collection
      const topEntries = await FAOModel.find({}).limit(10)
    
      // Initialize an array to store the results for each entry
      const results = [];
    
      // Iterate over the top entries and check each one
      for (let entry of topEntries) {
        const websiteLink = entry.PublishedLink; // Assuming PublishedLink field contains websiteLink
        const hrefToCheck = entry.LTE; // Assuming LTE field contains hrefToCheck
        console.log(hrefToCheck)
    
        // Launch a headless browser with Puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
    
        // Navigate to the websiteLink
        await page.goto(websiteLink);
    
        // Extract all href attributes from anchor elements on the page
        const hrefs = await page.$$eval('a', (links) =>
          links.map((link) => link.getAttribute('href'))
        );
    
        await browser.close();
    
        // Check if the hrefToCheck is present among the extracted hrefs
        const isHrefPresent = hrefs.some((href) => {
            if (href !== null) {
              const normalizedHrefToCheck = hrefToCheck.toLowerCase().trim().replace(/\/$/, ''); // Normalize the URL
              const normalizedHref = href.toLowerCase().trim().replace(/\/$/, ''); // Normalize the URL
              return normalizedHref === normalizedHrefToCheck;
            } else {
              // Skip null entries
              return false;
            }
          });
          
    
        // Push the result for this entry to the results array
        results.push({
          websiteLink,
          hrefToCheck,
          isHrefPresent,
        });
      }

      console.log(results)
    
      // Filter the results array to get entries where isHrefPresent is false
      const filteredResults = results.filter((entry) => !entry.isHrefPresent);
    
      // Return the filtered results
      res.json({ results: filteredResults });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  
// app.get("/", async (req, res) => {
//     try {
//       const browser = await puppeteer.launch({ headless: "new" });
//       const page = await browser.newPage();
  
//       await page.goto("https://www.dailyblogging.in/blog/technology/the-5-best-photo-organizing-software-programs/757912794", {timeout: 60000});
  
//       await page.waitForSelector('a[href="https://techyhost.com/photo-organizer-software/"]');
      
//       const result = await page.evaluate(() => {
//         const anchors = Array.from(document.querySelectorAll('a'));
//         const targetHref = "https://techyhost.com/photo-organizer-software/";
//         const matchingAnchor = anchors.find((anchor) => anchor.href === targetHref);
//         return matchingAnchor ? matchingAnchor.innerHTML : null;
//       });
  
//       await browser.close();
  
//       res.json({ result });
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ error: "An error occurred" });
//     }
//   });
  
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });