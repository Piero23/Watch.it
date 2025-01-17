package org.unical.webapp.backend.persistence.dao.DaoImpl;

import org.springframework.stereotype.Component;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.persistence.DBManager;
import org.unical.webapp.backend.persistence.dao.ContenutoDao;
import org.unical.webapp.backend.persistence.dao.DaoImpl.proxy.ContenutoProxy;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ConcreteContenutoDao implements ContenutoDao {

  Connection connection;

  public ConcreteContenutoDao() {
    this.connection = DBManager.getInstance().getConnection();
  }

  @Override
  public Contenuto findById(int id, boolean type) {
    try {
      PreparedStatement query = connection.prepareStatement("select * from contenuto where id_contenuto = ? and is_serie=?");
      query.setInt(1, id);
      query.setBoolean(2, type);
      ResultSet rs = query.executeQuery();
      if (!rs.isBeforeFirst()) {
        save(id,type);
        query = connection.prepareStatement("select * from contenuto where id_contenuto = ? and is_serie=?");
        query.setInt(1, id);
        query.setBoolean(2, type);
        rs = query.executeQuery();
      }

      rs.next();
      Contenuto contenuto = new ContenutoProxy();
      contenuto.setId_contenuto(rs.getInt("id_contenuto"));
      contenuto.setIs_serie(rs.getBoolean("is_serie"));

      return contenuto;

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Contenuto> findAll() {
    List<Contenuto> contenuti = new ArrayList<Contenuto>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from contenuto");
      ResultSet rs = query.executeQuery();
      while (rs.next()) {
        Contenuto contenuto = new ContenutoProxy();
        contenuto.setId_contenuto(rs.getInt("id_contenuto"));
        contenuto.setIs_serie(rs.getBoolean("is_serie"));

        contenuti.add(contenuto);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return contenuti;
  }

  @Override
  public List<Contenuto> findByUtente(String utente) {
    List<Contenuto> contenuti = new ArrayList<Contenuto>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from contenuto_utente join contenuto on contenuto_utente.id_contenuto=contenuto.id where utente=?");
      query.setString(1, utente);
      ResultSet rs = query.executeQuery();
      while (rs.next()) {
        Contenuto contenuto = new ContenutoProxy();
        contenuto.setId_contenuto(rs.getInt("id_api"));
        contenuto.setIs_serie(rs.getBoolean("is_serie"));
        contenuto.setUtente(rs.getString("utente"));
        contenuto.setStagione(rs.getInt("num_stagione"));
        contenuto.setEpisodio(rs.getInt("num_episodio"));
        contenuto.setStatus(rs.getInt("status"));
        contenuto.setRating(rs.getInt("valutazione"));

        contenuti.add(contenuto);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return contenuti;
  }

  @Override
  public void save(int idContenuto, boolean tipo) {
    try {
      PreparedStatement query = connection.prepareStatement(
              "insert into contenuto (id_contenuto, is_serie) values (?,?)"
      );

      query.setInt(1, idContenuto);
      query.setBoolean(2, tipo);
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void delete(int id, boolean isSerie, String username) {
    try {
      PreparedStatement query = connection.prepareStatement(
              "DELETE FROM contenuto_utente USING contenuto  WHERE contenuto_utente.id_contenuto = contenuto.id AND contenuto_utente.id_api= ? AND contenuto.is_serie = ? AND contenuto_utente.utente = ?"
      );

      query.setInt(1, id);
      query.setBoolean(2, isSerie);
      query.setString(3, username);
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void updateStatus(String utente, int idContenuto, boolean tipo, int status) {
    /*Status
      0 = Da Vedere
      1 = In Visione
      2 = Visto
     */

    try {
      PreparedStatement query = connection.prepareStatement(
              "select * from contenuto_utente join contenuto on contenuto_utente.id_contenuto=contenuto.id where id_api = ? and is_serie=? and utente = ?"
      );

      query.setInt(1, idContenuto);
      query.setBoolean(2, tipo);
      query.setString(3, utente);
      ResultSet rs = query.executeQuery();

      if (!rs.isBeforeFirst()) {

        newContenutoUtente(utente, idContenuto, tipo, status);

      } else {
        query = connection.prepareStatement("update contenuto_utente set status = ? where (id_contenuto = ? and utente = ?)");
        query.setInt(1, status);
        query.setInt(2, getContentID(idContenuto, tipo));
        query.setString(3, utente);
        query.executeUpdate();
      }

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void updateSeasonEpisode(String utente, int idContenuto, int stagione, int episodio) {
    try {

      PreparedStatement query = connection.prepareStatement("update contenuto_utente set num_stagione=?, num_episodio=? where (id_api = ? and utente = ?)");
      query.setInt(1, stagione);
      query.setInt(2, episodio);
      query.setInt(3, idContenuto);
      query.setString(4, utente);
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  private int getContentID(int idContenuto, boolean tipo) {
    int id=0;
    try {
      PreparedStatement query = connection.prepareStatement("select id from contenuto where id_contenuto = ? and is_serie=?");
      query.setInt(1, idContenuto);
      query.setBoolean(2, tipo);
      ResultSet rs = query.executeQuery();
      if (!rs.isBeforeFirst()) {
        save(idContenuto, tipo);
        query = connection.prepareStatement("select id from contenuto where id_contenuto = ? and is_serie=?");
        query.setInt(1, idContenuto);
        query.setBoolean(2, tipo);
        rs = query.executeQuery();
      }
      rs.next();
      id = rs.getInt("id");
    } catch (Exception e) {
    }
    return id;
  }

  private void newContenutoUtente(String utente, int contenutoId, boolean tipo, int status){
    try {
      PreparedStatement query = connection.prepareStatement("insert into contenuto_utente (utente, id_contenuto, id_api, num_episodio, num_stagione, status, valutazione) values (?, ?, ?, ?, ?, ?, ?)");
      query.setString(1, utente);
      query.setInt(2, getContentID(contenutoId, tipo));
      query.setInt(3, contenutoId);

      if (tipo) {
        query.setInt(4, 1);
        query.setInt(5, 1);
      } else {
        query.setInt(4, 0);
        query.setInt(5, 0);
      }

      query.setInt(6, status); //Visto==2
      query.setInt(7, 0);
      query.executeUpdate();
      connection.commit();
    } catch (Exception e){}
  }

  @Override
  public void editRating(String utente, boolean type, int idContenuto, int rating) {
    try {

      PreparedStatement query = connection.prepareStatement("update contenuto_utente   set valutazione=? from contenuto where (contenuto_utente.id_contenuto=contenuto.id AND id_api = ? and is_serie=? and utente = ?)");
      query.setInt(1, rating);
      query.setInt(2, idContenuto);
      query.setBoolean(3, type);
      query.setString(4, utente);
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
}