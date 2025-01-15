package org.unical.webapp.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.AbstractController;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.service.UtenteServiceInterface;

import java.sql.Blob;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/utente")
public class UtenteController {

    private static final Logger log = LoggerFactory.getLogger(UtenteController.class);
    private final UtenteServiceInterface utenteService;

    public UtenteController(UtenteServiceInterface utenteService) {
        this.utenteService = utenteService;
    }

    @RequestMapping(value="/getContenutiByUtente/{utente}", method=RequestMethod.GET)
    ResponseEntity<Collection<Contenuto>> getContenutiByUtente(@PathVariable String utente) {
        return  ResponseEntity.ok(
                utenteService.getContenutiByUtente(utenteService.getByUsername(utente))
        );
    }

    @RequestMapping(value="/setProPic/{utente}", method=RequestMethod.POST)
    void setPropic(@RequestBody String utente, @RequestBody byte[] propic) {
        utenteService.newProPic(utenteService.getByUsername(utente), propic);
    }

    @RequestMapping(value="/setBgImage/{utente}", method=RequestMethod.POST)
    void setBgImage(@PathVariable String utente, @RequestBody byte[] image) {
        utenteService.newBgImage(utenteService.getByUsername(utente), image);
    }

    @RequestMapping(value="/getUtente/{utente}", method=RequestMethod.GET)
    ResponseEntity<Utente> getUtente(@PathVariable String utente) {
        return  ResponseEntity.ok(
                utenteService.getByUsername(utente)
        );
    }

    Map<String, HttpServletRequest> sessionRegistered = new HashMap<>();

    @RequestMapping(value="/register", method=RequestMethod.POST)
    String registerUser(HttpServletRequest request, @RequestBody Map<String, String> payload) {

        String username =payload.get("username");
        String mail =payload.get("mail");
        String password =payload.get("password");
        JSONObject response = new JSONObject();


        //Utente esiste già
        if(utenteService.checkExistingUtente(username,mail)){
            response.put("status", "error user already exists or email alredy exists");
            System.out.println("ciaaa");
            return response.toString();
        }

        //Aggiungi DB
        utenteService.newUtente(new Utente(username, mail, password, null, null, false));

        sessionRegistered.put(request.getSession().getId(),request);
        response.put("status",200);
        return response.toString();
    }

    @RequestMapping(value="/login", method=RequestMethod.POST)
    String logUser(HttpServletRequest request, @RequestBody Map<String, String> payload) {

        String mail =payload.get("mail");
        String password =payload.get("password");
        JSONObject response = new JSONObject();

        if(utenteService.login(mail,password)){
            sessionRegistered.put(request.getSession().getId(),request);

            response.put("status", "200");
            return response.toString();
        }
        response.put("status","500 email or password incorrect");
        return response.toString();
    }
}
