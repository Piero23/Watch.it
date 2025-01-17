package org.unical.webapp.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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

    @RequestMapping(value = "/getContenutiByUtente/{utente}", method = RequestMethod.GET)
    ResponseEntity<Collection<Contenuto>> getContenutiByUtente(@PathVariable String utente) {
        return ResponseEntity.ok(
                utenteService.getContenutiByUtente(utenteService.getByUsername(utente))
        );
    }

    @RequestMapping(value = "/setProPic/{utente}", method = RequestMethod.POST)
    void setPropic(@PathVariable String utente, @RequestBody byte[] propic) {
        utenteService.newProPic(utenteService.getByUsername(utente), propic);
    }

    @RequestMapping(value = "/setBgImage/{utente}", method = RequestMethod.POST)
    void setBgImage(@PathVariable String utente, @RequestBody byte[] image) {
        utenteService.newBgImage(utenteService.getByUsername(utente), image);
    }

    @RequestMapping(value = "/getUtente/{utente}", method = RequestMethod.GET)
    ResponseEntity<Utente> getUtente(@PathVariable String utente) {
        return ResponseEntity.ok(
                utenteService.getByUsername(utente)
        );
    }

    Map<String, String> sessionRegistered = new HashMap<>();

    @PostMapping("/register")
    public String registerUser(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String mail = payload.get("mail");
        String password = payload.get("password");
        JSONObject responseJSON = new JSONObject();

        // Verifica se l'utente o l'email esiste già
        if (utenteService.checkExistingUtente(username, mail)) {
            responseJSON.put("status", "error user already exists or email already exists");
            return responseJSON.toString();
        }

        // Aggiungi utente al database
        utenteService.newUtente(new Utente(username, mail, password, null, null, false));

        // Crea una nuova sessione e salva i dati essenziali
        HttpSession session = request.getSession(true);
        session.setAttribute("username", username);
        sessionRegistered.put(session.getId(), username);

        // Imposta il cookie di sessione
        Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
        sessionCookie.setMaxAge(7 * 24 * 60 * 60); // 7 giorni di durata
        sessionCookie.setHttpOnly(true);
        sessionCookie.setPath("/");
        response.addCookie(sessionCookie);

        responseJSON.put("status", 200);
        return responseJSON.toString();
    }

    @PostMapping("/login")
    public String logUser(HttpServletRequest request, HttpServletResponse response, @RequestBody Map<String, String> payload) {
        String mail = payload.get("mail");
        String password = payload.get("password");
        JSONObject jsonResponse = new JSONObject();

        // Verifica login
        if (utenteService.login(mail, password)) {
            String username = utenteService.findByEmail(mail).getUsername();

            // Crea una nuova sessione e salva i dati
            HttpSession session = request.getSession(true);
            session.setAttribute("username", username);
            sessionRegistered.put(session.getId(), username);

            // Imposta il cookie di sessione
            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setMaxAge(7 * 24 * 60 * 60); // 7 giorni di durata
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            jsonResponse.put("status", 200);
            return jsonResponse.toString();
        }

        jsonResponse.put("status", "500 email or password incorrect");
        return jsonResponse.toString();
    }

    @GetMapping("/logout")
    public String logOutUser(HttpServletRequest request, HttpServletResponse response) {
        JSONObject jsonResponse = new JSONObject();

        // Recupera la sessione esistente
        HttpSession session = request.getSession(false);
        if (session == null || !sessionRegistered.containsKey(session.getId())) {
            jsonResponse.put("status", "500 Error session not found");
            return jsonResponse.toString();
        }

        // Rimuovi la sessione registrata e invalida la sessione
        sessionRegistered.remove(session.getId());
        session.invalidate();

        // Invalida il cookie di sessione
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Usalo solo su HTTPS in produzione
        cookie.setPath("/");
        cookie.setMaxAge(0); // Scade immediatamente
        response.addCookie(cookie);

        jsonResponse.put("status", 200);
        return jsonResponse.toString();
    }

    @GetMapping("/getUserBySession")
    public String getUserBySession(HttpServletRequest request) {
        JSONObject jsonResponse = new JSONObject();

        // Recupera la sessione esistente
        HttpSession session = request.getSession(false);
        if (session == null) {
            jsonResponse.put("status", "500 Error session not found");
            return jsonResponse.toString();
        }

        // Recupera l'utente dalla mappa thread-safe
        String username = sessionRegistered.get(session.getId());
        if (username == null) {
            jsonResponse.put("status", "500 Error session not found");
            return jsonResponse.toString();
        }

        jsonResponse.put("status", 200);
        jsonResponse.put("username", username);
        return jsonResponse.toString();
    }


}
