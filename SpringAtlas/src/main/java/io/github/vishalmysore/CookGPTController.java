package io.github.vishalmysore;

import jakarta.annotation.PostConstruct;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CookGPTController {

   @Autowired
   private CookGPTVectorService vectorService;

    @GetMapping("/getRecipe")
    public List<Document> getRecipe(@RequestParam("name") String name) {

        return vectorService.getSimilarDocuments(name);
    }

    @PostMapping("/addRecipe")
    public String addRecipe(@RequestParam("name") String name, @RequestParam("recipe") String recipe) {
        vectorService.addRecipe("recipe for " + name+ " : "+ recipe);
        return "Receipe for " + name + " added successfully!";
    }

}
