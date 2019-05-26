package com.c2v4.greenery.config;

import java.util.Map;

public class SchedulerConfig {
  private String type;
  private String name;
  private Map<String, Object> props;

  @Override
  public String toString() {
    return "SchedulerConfig{"
        + "type='"
        + type
        + '\''
        + ", name='"
        + name
        + '\''
        + ", props="
        + props
        + '}';
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Map<String, Object> getProps() {
    return props;
  }

  public void setProps(Map<String, Object> props) {
    this.props = props;
  }
}
