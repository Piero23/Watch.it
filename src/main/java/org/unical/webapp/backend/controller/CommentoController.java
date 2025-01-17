package org.unical.webapp.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.persistence.dao.DaoImpl.proxy.CommentoProxy;
import org.unical.webapp.backend.service.CommentoServiceInterface;
import org.unical.webapp.backend.service.ContenutoServiceInterface;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/commento")
public class CommentoController {

    private static final Logger log = LoggerFactory.getLogger(CommentoController.class);
    private final CommentoServiceInterface commentoService;

    public CommentoController(CommentoServiceInterface commentoService) {
        this.commentoService = commentoService;
    }

    @RequestMapping(value="/setAnswer/{question}/{answer}", method= RequestMethod.GET)
    void setAnswer(@PathVariable int question, @PathVariable int answer) {
        commentoService.setAnswer(commentoService.getCommentoById(question), commentoService.getCommentoById(answer));
    }

    @RequestMapping(value="/newComment", method= RequestMethod.POST)
    void newComment(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String,String> payload) {

        int content_id= Integer.parseInt(payload.get("content_id"));
        boolean content_type= !Objects.equals(payload.get("content_type"), "film");
        String body= payload.get("text");
        int rating= Integer.parseInt(payload.get("rating"));
        String user= payload.get("user");

        Commento c = new CommentoProxy();


        if(payload.get("answers_to") != null) {
            int answers_to = Integer.parseInt(payload.get("answers_to"));
            c.setCommento_risposto(answers_to);
        }


        c.setId_contenuto_api(content_id);
        c.setIs_serie(content_type);
        c.setContenuto(body);
        c.setVoto(rating);
        c.setUsername_utente(user);

        commentoService.saveCommento(c);

    }

    @RequestMapping(value="/deleteComment", method= RequestMethod.POST)
    void deleteComment(@RequestBody Map<String,String> payload) {

        int comment_id= Integer.parseInt(payload.get("comment_id"));

        commentoService.deleteComment(comment_id);
    }
}
